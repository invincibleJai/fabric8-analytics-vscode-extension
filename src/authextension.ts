'use strict';

import * as vscode from 'vscode';

import { Apiendpoint } from './apiendpoint';

export module authextension {

    const request = require('request');
    export let authorize_f8_analytics: any;
    export let get_access_token_osio: any;
    export let register_3scale_api: any;

    authorize_f8_analytics = (context, cb) => {
        let osioTokenExt = vscode.extensions.getExtension('redhat.osio-auth-service');
        if(osioTokenExt){
            let importedApi = osioTokenExt.exports;
            if(importedApi && importedApi.hasOwnProperty("refresh_token")) {
                Apiendpoint.OSIO_REFRESH_TOKEN = importedApi["refresh_token"];
                //get_access_token_osio(Apiendpoint, context, cb);
                Apiendpoint.STACK_API_TOKEN = importedApi["access_token"];
                // 3scale api registartion

                register_3scale_api(Apiendpoint.STACK_API_TOKEN, () => {
                    console.log('Success');
                });
                //Apiendpoint.OSIO_REFRESH_TOKEN = resp.token.refresh_token;
                process.env['RECOMMENDER_API_TOKEN'] = Apiendpoint.STACK_API_TOKEN;
                context.globalState.update('f8_access_token', Apiendpoint.STACK_API_TOKEN);
                context.globalState.update('f8_refresh_token', Apiendpoint.OSIO_REFRESH_TOKEN);
                cb(true);
            } else {
                vscode.window.showErrorMessage(`Looks like your extension is not authorized, kindly authorize with OSIO`);
                cb(null);
            }
        } else {
            vscode.window.showErrorMessage(`Looks like your extension is not authorized, kindly authorize with OSIO`);
            cb(null);
        }
        
    }


    get_access_token_osio = (Apiendpoint, context, cb) => {
        let bodyData: any = {'refresh_token': `${Apiendpoint.OSIO_REFRESH_TOKEN}`};
        let options = {};
        options['url'] = `${Apiendpoint.OSIO_AUTH_URL}`;
        options['method'] = 'POST';
        options['headers'] = {'Content-Type': 'application/json'};
        options['body'] = JSON.stringify(bodyData);
        request(options, (err, httpResponse, body) => {
          if ((httpResponse.statusCode == 200 || httpResponse.statusCode == 202)) {
            let resp = JSON.parse(body);
            if (resp && resp.token) {
                Apiendpoint.STACK_API_TOKEN = resp.token.access_token;
                Apiendpoint.OSIO_REFRESH_TOKEN = resp.token.refresh_token;
                process.env['RECOMMENDER_API_TOKEN'] = Apiendpoint.STACK_API_TOKEN;
                context.globalState.update('f8_access_token', Apiendpoint.STACK_API_TOKEN);
                context.globalState.update('f8_refresh_token', Apiendpoint.OSIO_REFRESH_TOKEN);
                cb(true);
            } else {
                vscode.window.showErrorMessage(`Failed with Status code : ${httpResponse.statusCode}`);
                cb(null);
            }
          } else if(httpResponse.statusCode == 401){
              vscode.window.showErrorMessage(`Looks like your token is not proper, kindly authorize again`);
              cb(null);
          } else {   
            vscode.window.showErrorMessage(`Looks like your token is not proper, kindly authorize again, Status: ${httpResponse.statusCode}`);
            cb(null);
          }
        });
    }

    register_3scale_api = (access_token: any, cb) => {
        let bodyData: any = {'auth_token': `${access_token}`};
        let options = {};
        options['url'] = `http://localhost:5000/register`;
        options['method'] = 'POST';
        options['headers'] = {'Content-Type': 'application/json'};
        options['body'] = JSON.stringify(bodyData);
        request(options, (err, httpResponse, body) => {
          if ((httpResponse.statusCode == 200 || httpResponse.statusCode == 202)) {
            console.log(body);
            let resp = JSON.parse(body);
            if (resp && resp.token) {
                cb(true);
            } else {
                vscode.window.showErrorMessage(`Failed with 3scale registeration : ${httpResponse.statusCode}`);
                cb(null);
            }
          } else if(httpResponse.statusCode == 401){
              vscode.window.showErrorMessage(`Looks like your token is not proper, kindly authorize again`);
              cb(null);
          } else {   
            vscode.window.showErrorMessage(`Looks like your token is not proper, kindly authorize again, Status: ${httpResponse.statusCode}`);
            cb(null);
          }
        });
    };


}