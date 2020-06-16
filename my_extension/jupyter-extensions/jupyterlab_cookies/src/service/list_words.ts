import {ServerConnection} from '@jupyterlab/services';
import {URLExt} from "@jupyterlab/coreutils";

export interface Projects {
  projects: Project[];
}

export interface Project {
  id: string;
  datasets: Dataset[];
}

export interface Datasets{
  datasets: Dataset[];
}

export interface Dataset {
  id: string;
  tables: Table[];
}

export interface Table {
  name: string;
}

export class ListWordsService {

  async listWords(num_items: number): Promise<Datasets> {
    return new Promise((resolve, reject) => {
      let serverSettings = ServerConnection.makeSettings();
      const requestUrl = URLExt.join(
        serverSettings.baseUrl, 'cookies/v1/list');
      const body = {'num_items': num_items}
      const requestInit: RequestInit = {
        body: JSON.stringify(body),
        method: "POST",
      };
      ServerConnection.makeRequest(requestUrl, requestInit, serverSettings
      ).then((response) => {
        response.json().then((content) => {
          if (content.error) {
            console.error(content.error);
            reject(content.error);
            return [];
          }
          resolve({
            datasets: content.datasets.map((d: any) => {
              return {
                id: d.id,
                tables: d.tables
              }
            })
          });
        });
      });
    });
  }
}
