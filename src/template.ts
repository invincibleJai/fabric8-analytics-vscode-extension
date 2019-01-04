'use strict';

/**
 * Commonly used commands
 */
export namespace Templates {
  /**
   * Template for loaders
   */
  export const LOADER_TEMPLATE = `<!DOCTYPE html>
    <html>
    <head>
        <meta HTTP-EQUIV="CACHE-CONTROL" CONTENT="NO-CACHE">
        <meta HTTP-EQUIV="PRAGMA" CONTENT="NO-CACHE">
        <style>
        html, body {
            width: 100%;
            height: 100%;
            font-size: 16px;
        }

        body {
            background: #1e1e1e;
        }

        #caption {
            font-family: sans-serif;
            font-weight: 100;
        }

        .blob {
            width: 2rem;
            height: 2rem;
            background: rgba(230, 230, 230, 0.85);
            border-radius: 50%;
            position: absolute;
            left: calc(50% - 1rem);
            top: calc(42% - 1rem);
            box-shadow: 0 0 1rem rgba(255, 255, 255, 0.35);
        }

        .blob-2 {
            -webkit-animation: animate-to-2 3.5s infinite;
            animation: animate-to-2 3.5s infinite;
        }

        .blob-3 {
            -webkit-animation: animate-to-3 3.5s infinite;
            animation: animate-to-3 3.5s infinite;
        }

        .blob-1 {
            -webkit-animation: animate-to-1 3.5s infinite;
            animation: animate-to-1 3.5s infinite;
        }

        .blob-4 {
            -webkit-animation: animate-to-4 3.5s infinite;
            animation: animate-to-4 3.5s infinite;
        }

        .blob-0 {
            -webkit-animation: animate-to-0 3.5s infinite;
            animation: animate-to-0 3.5s infinite;
        }

        .blob-5 {
            -webkit-animation: animate-to-5 3.5s infinite;
            animation: animate-to-5 3.5s infinite;
        }

        @-webkit-keyframes animate-to-2 {
            25%, 75% {
                -webkit-transform: translateX(-1.5rem) scale(0.75);
                transform: translateX(-1.5rem) scale(0.75);
            }
            95% {
                -webkit-transform: translateX(0rem) scale(1);
                transform: translateX(0rem) scale(1);
            }
        }

        @keyframes animate-to-2 {
            25%, 75% {
                -webkit-transform: translateX(-1.5rem) scale(0.75);
                transform: translateX(-1.5rem) scale(0.75);
            }
            95% {
                -webkit-transform: translateX(0rem) scale(1);
                transform: translateX(0rem) scale(1);
            }
        }

        @-webkit-keyframes animate-to-3 {
            25%, 75% {
                -webkit-transform: translateX(1.5rem) scale(0.75);
                transform: translateX(1.5rem) scale(0.75);
            }
            95% {
                -webkit-transform: translateX(0rem) scale(1);
                transform: translateX(0rem) scale(1);
            }
        }

        @keyframes animate-to-3 {
            25%, 75% {
                -webkit-transform: translateX(1.5rem) scale(0.75);
                transform: translateX(1.5rem) scale(0.75);
            }
            95% {
                -webkit-transform: translateX(0rem) scale(1);
                transform: translateX(0rem) scale(1);
            }
        }

        @-webkit-keyframes animate-to-1 {
            25% {
                -webkit-transform: translateX(-1.5rem) scale(0.75);
                transform: translateX(-1.5rem) scale(0.75);
            }
            50%, 75% {
                -webkit-transform: translateX(-4.5rem) scale(0.6);
                transform: translateX(-4.5rem) scale(0.6);
            }
            95% {
                -webkit-transform: translateX(0rem) scale(1);
                transform: translateX(0rem) scale(1);
            }
        }

        @keyframes animate-to-1 {
            25% {
                -webkit-transform: translateX(-1.5rem) scale(0.75);
                transform: translateX(-1.5rem) scale(0.75);
            }
            50%, 75% {
                -webkit-transform: translateX(-4.5rem) scale(0.6);
                transform: translateX(-4.5rem) scale(0.6);
            }
            95% {
                -webkit-transform: translateX(0rem) scale(1);
                transform: translateX(0rem) scale(1);
            }
        }

        @-webkit-keyframes animate-to-4 {
            25% {
                -webkit-transform: translateX(1.5rem) scale(0.75);
                transform: translateX(1.5rem) scale(0.75);
            }
            50%, 75% {
                -webkit-transform: translateX(4.5rem) scale(0.6);
                transform: translateX(4.5rem) scale(0.6);
            }
            95% {
                -webkit-transform: translateX(0rem) scale(1);
                transform: translateX(0rem) scale(1);
            }
        }
        @keyframes animate-to-4 {
            25% {
                -webkit-transform: translateX(1.5rem) scale(0.75);
                        transform: translateX(1.5rem) scale(0.75);
            }
            50%, 75% {
                -webkit-transform: translateX(4.5rem) scale(0.6);
                        transform: translateX(4.5rem) scale(0.6);
            }
            95% {
                -webkit-transform: translateX(0rem) scale(1);
                        transform: translateX(0rem) scale(1);
            }
        }
        @-webkit-keyframes animate-to-0 {
            25% {
                -webkit-transform: translateX(-1.5rem) scale(0.75);
                        transform: translateX(-1.5rem) scale(0.75);
            }
            50% {
                -webkit-transform: translateX(-4.5rem) scale(0.6);
                        transform: translateX(-4.5rem) scale(0.6);
            }
            75% {
                -webkit-transform: translateX(-7.5rem) scale(0.5);
                        transform: translateX(-7.5rem) scale(0.5);
            }
            95% {
                -webkit-transform: translateX(0rem) scale(1);
                        transform: translateX(0rem) scale(1);
            }
        }
        @keyframes animate-to-0 {
            25% {
                -webkit-transform: translateX(-1.5rem) scale(0.75);
                        transform: translateX(-1.5rem) scale(0.75);
            }
            50% {
                -webkit-transform: translateX(-4.5rem) scale(0.6);
                        transform: translateX(-4.5rem) scale(0.6);
            }
            75% {
                -webkit-transform: translateX(-7.5rem) scale(0.5);
                        transform: translateX(-7.5rem) scale(0.5);
            }
            95% {
                -webkit-transform: translateX(0rem) scale(1);
                        transform: translateX(0rem) scale(1);
            }
        }
        @-webkit-keyframes animate-to-5 {
            25% {
                -webkit-transform: translateX(1.5rem) scale(0.75);
                        transform: translateX(1.5rem) scale(0.75);
            }
            50% {
                -webkit-transform: translateX(4.5rem) scale(0.6);
                        transform: translateX(4.5rem) scale(0.6);
            }
            75% {
                -webkit-transform: translateX(7.5rem) scale(0.5);
                        transform: translateX(7.5rem) scale(0.5);
            }
            95% {
                -webkit-transform: translateX(0rem) scale(1);
                        transform: translateX(0rem) scale(1);
            }
        }
        @keyframes animate-to-5 {
            25% {
                -webkit-transform: translateX(1.5rem) scale(0.75);
                        transform: translateX(1.5rem) scale(0.75);
            }
            50% {
                -webkit-transform: translateX(4.5rem) scale(0.6);
                        transform: translateX(4.5rem) scale(0.6);
            }
            75% {
                -webkit-transform: translateX(7.5rem) scale(0.5);
                        transform: translateX(7.5rem) scale(0.5);
            }
            95% {
                -webkit-transform: translateX(0rem) scale(1);
                        transform: translateX(0rem) scale(1);
            }
        }
        </style>
        </head>
    <body>
        <div id="loading_screen">
        <div style="text-align: center;margin-top:130px;" id="caption">
            <h1 style='color:#ffffff'>Dependency Analytics</h1>
            <h2 style='color:#ffffff'>Analyzing application dependencies...</h2>
            <br />
            <br />
            <br />
        </div>
        <div>
            <div class="blob blob-0"></div>
            <div class="blob blob-1"></div>
            <div class="blob blob-2"></div>
            <div class="blob blob-3"></div>
            <div class="blob blob-4"></div>
            <div class="blob blob-5"></div>
        </div>
        <br />
        </div>
    </body>
    </html>`;

  export const HEADER_TEMPLATE = `<!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8"/>
    <meta HTTP-EQUIV="CACHE-CONTROL" CONTENT="NO-CACHE">
    <meta HTTP-EQUIV="PRAGMA" CONTENT="NO-CACHE">
    <style>
    html,body {
    width: 100%;
    height: 100%;
    font-size: 16px;
    }

    body {
    background: #1e1e1e;
    }

    .caption {
    font-family: sans-serif;
    font-weight: 100;
    padding-left: 4px;
    }

    .top-caption {
    border-bottom: 1px solid #555;
    width: 95%;
    }

    </style>
    </head>
    <body>
    <div class='top-caption'>
    </div>`;

  export const FOOTER_TEMPLATE = '</body></html>';
}
