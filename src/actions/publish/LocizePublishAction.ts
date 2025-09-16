import {getAllReleases, TranslationUtil} from "../../core";
import vscode from "vscode";

const createHtml = () => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      body {
        padding: 10px;
      }
    
      #products {
        display: flex;
        flex-direction: row;
        gap: 10px;
      }
      
      .product {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
    </style>
  </head>

  <body>
    <div id="products"/>

    <script>
      const vscode = acquireVsCodeApi();
      
      function compareVersionsDesc(a, b) {
        const partsA = a.split('.').map(Number);
        const partsB = b.split('.').map(Number);
      
        const len = Math.max(partsA.length, partsB.length);
      
        for (let i = 0; i < len; i++) {
          const numA = partsA[i] || 0;
          const numB = partsB[i] || 0;
          if (numA > numB) return -1; // для убывания
          if (numA < numB) return 1;
        }
        return 0; // равны
      }
      
      window.addEventListener('message', event => {
        const releases = event.data.releases;
        
        const productsDiv = document.getElementById('products');
        
        productsDiv.innerHTML = "";
        
        const addProductVersions = (product) => {
         const productDiv = document.createElement('div');
          productDiv.classList.add('product');
          
          releases
            .filter(release => release.product === product)
            .sort((a, b) => compareVersionsDesc(a.version, b.version))
            .forEach(release => {
              const releaseButton = document.createElement('button');
              releaseButton.innerHTML = release.product + " " + release.version;
              releaseButton.click = () => {
                  vscode.postMessage({ type: 'publish', release });
              }
              releaseButton.addEventListener('click', () => {
                vscode.postMessage({ type: 'publish', release });
              });
              productDiv.appendChild(releaseButton);
            });
          
          productsDiv.appendChild(productDiv);
        };

        addProductVersions("777");
        addProductVersions("slotoking");
        addProductVersions("vegas");
      });
    </script>
  </body>
</html>
`;

export class LocizePublishAction {
  async execute() {
    const releases = getAllReleases();

    const panel = vscode.window.createWebviewPanel(
      'buttonsPanel',
      'Locize Publish',
      vscode.ViewColumn.One,
      {enableScripts: true}
    );

    panel.webview.html = createHtml();

    panel.webview.onDidReceiveMessage(
      message => {
        switch (message.type) {
          case 'publish':
            TranslationUtil.run("publish", {release: message.release});
            break;
        }
      },
      undefined,
    );

    panel.webview.postMessage({releases});
  }
}
