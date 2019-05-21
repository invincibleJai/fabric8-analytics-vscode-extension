'use strict';

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as os from 'os';

import { stackanalysismodule } from './stackanalysismodule';
import { authextension } from './authextension';
import { StatusMessages } from './statusMessages';
import { DependencyReportPanel } from './dependencyReportPanel';

export module multimanifestmodule {
  export const form_manifests_payload = (resultPath): any => {
    return new Promise((resolve, reject) => {
      manifestFileRead(resultPath)
        .then(item => {
          let form_data = {
            'manifest[]': [],
            'filePath[]': [],
            'license[]': [],
            origin: 'lsp'
          };
          if (item && item['manifest'] && item['filePath']) {
            form_data['manifest[]'].push(item['manifest']);
            form_data['filePath[]'].push(item['filePath']);
          }
          //TODO : for logging 400 issue
          if (!item['manifest'] && !item['license']) {
            console.log('Manifest is missed', item);
          }
          if (!item['filePath'] && !item['license']) {
            console.log('filePath is missed', item);
          }
          resolve(form_data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  export const manifestFileRead = fsPath => {
    let form_data = {
      manifest: '',
      filePath: '',
      license: ''
    };
    let manifestObj: any;
    let filePath: string = '';
    return new Promise((resolve, reject) => {
      fs.readFile(fsPath, function(err, data) {
        if (data) {
          manifestObj = {
            value: '',
            options: {
              filename: '',
              contentType: 'text/plain'
            }
          };
          if (fsPath) {
            let filePathSplit = /(\/target|)/g;
            let strSplit = '/';
            if (os.platform() === 'win32') {
              filePathSplit = /(\\target|)/g;
              strSplit = '\\';
            }
            filePath = fsPath.replace(filePathSplit, '');
            if (
              filePath &&
              typeof filePath === 'string' &&
              filePath.indexOf('npmlist') !== -1
            ) {
              form_data['filePath'] = 'package.json';
              manifestObj.options.filename = 'npmlist.json';
              manifestObj.options.contentType = 'application/json';
              manifestObj.value = data.toString();
              form_data['manifest'] = manifestObj;
            } else if (
              filePath &&
              typeof filePath === 'string' &&
              filePath.indexOf('pylist.json') !== -1
            ) {
              form_data['filePath'] = 'requirements.txt';
              manifestObj.options.filename = 'pylist.json';
              manifestObj.options.contentType = 'application/json';
              manifestObj.value = data.toString();
              form_data['manifest'] = manifestObj;
            } else if (
              filePath &&
              typeof filePath === 'string' &&
              filePath.indexOf('dependencies.txt') !== -1
            ) {
              form_data['filePath'] = 'pom.xml';
              manifestObj.options.filename = 'dependencies.txt';
              manifestObj.options.contentType = 'text/plain';
              manifestObj.value = data.toString();
              form_data['manifest'] = manifestObj;
            } else {
              form_data['filePath'] = filePath;
              manifestObj.value = data.toString();
              form_data['manifest'] = manifestObj;
            }
          }
          resolve(form_data);
        } else {
          vscode.window.showErrorMessage(err.message);
          reject(err.message);
        }
      });
    });
  };

  /*
   * Needed async function in order to wait for user selection in case of
   * multi root projects
   */
  export const dependencyAnalyticsReportFlow = async (context, uri = null) => {
    let workspaceFolder: vscode.WorkspaceFolder;
    if (uri) {
      if (uri.fsPath && uri.fsPath.toLowerCase().indexOf('pom.xml') !== -1) {
        workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);
        stackanalysismodule.processStackAnalyses(
          context,
          workspaceFolder,
          'maven',
          uri
        );
      } else if (
        uri.fsPath &&
        uri.fsPath.toLowerCase().indexOf('package.json') !== -1
      ) {
        workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);
        stackanalysismodule.processStackAnalyses(
          context,
          workspaceFolder,
          'npm',
          uri
        );
      } else if (
        uri.fsPath &&
        uri.fsPath.toLowerCase().indexOf('requirements.txt') !== -1
      ) {
        workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);
        stackanalysismodule.processStackAnalyses(
          context,
          workspaceFolder,
          'pypi',
          uri
        );
      }
    } else if (
      vscode.workspace.hasOwnProperty('workspaceFolders') &&
      vscode.workspace['workspaceFolders'].length > 1
    ) {
      let workspaceFolder = await vscode.window.showWorkspaceFolderPick({
        placeHolder: 'Pick Workspace Folder...'
      });
      if (workspaceFolder) {
        triggerFullStackAnalyses(context, workspaceFolder);
      } else {
        vscode.window.showInformationMessage(`No Workspace selected.`);
      }
    } else {
      let workspaceFolder = vscode.workspace.workspaceFolders[0];
      triggerFullStackAnalyses(context, workspaceFolder);
    }
  };

  export const triggerFullStackAnalyses = (
    context: vscode.ExtensionContext,
    workspaceFolder: vscode.WorkspaceFolder
  ) => {
    const relativePattern = new vscode.RelativePattern(
      workspaceFolder,
      '{pom.xml,**/package.json,requirements.txt}'
    );
    vscode.workspace.findFiles(relativePattern, '**/node_modules').then(
      (result: vscode.Uri[]) => {
        if (result && result.length) {
          // Do not create an effective pom if no pom.xml is present
          let effective_pom_skip = true;
          let ecosystem = 'npm';
          let pom_count = 0;
          result.forEach(item => {
            if (item.fsPath.indexOf('pom.xml') >= 0) {
              effective_pom_skip = false;
              pom_count += 1;
              ecosystem = 'maven';
            } else if (item.fsPath.indexOf('requirements.txt') >= 0) {
              ecosystem = 'pypi';
            }
          });

          if (!effective_pom_skip && pom_count === 0) {
            vscode.window.showInformationMessage(
              'Multi ecosystem support is not yet available.'
            );
            return;
          } else {
            stackanalysismodule.processStackAnalyses(
              context,
              workspaceFolder,
              ecosystem
            );
          }
        } else {
          vscode.window.showInformationMessage(
            StatusMessages.NO_SUPPORTED_MANIFEST
          );
        }
      },
      // Other ecosystem flow
      (reason: any) => {
        vscode.window.showInformationMessage(
          StatusMessages.NO_SUPPORTED_MANIFEST
        );
      }
    );
  };

  export const triggerManifestWs = context => {
    return new Promise((resolve, reject) => {
      authextension
        .authorize_f8_analytics(context)
        .then(data => {
          if (data) {
            DependencyReportPanel.createOrShow(context.extensionPath, null);
            resolve(true);
          }
        })
        .catch(err => {
          reject(`Unable to authenticate.`);
        });
    });
  };
}
