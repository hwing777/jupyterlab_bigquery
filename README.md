# Notebook BigQuery Extension

This is the codebase for the BigQuery extension in JupyterLab. The current version of the app is in the my_extension/jupyter-extensions/jupyterlab_bigquery directory. It is built off of the Cookie Cutter 2.0 Extension and will eventually be added to the Monorepo for JupyterLab extensions.

## Prerequisites

A cloud project must already exist in the Cloud Console.

* Python 3.5+
* [NPM](https://nodejs.org/en/) (For local development)

## GCP Installation

Requires gcloud from the Google Cloud SDK to be [installed](https://cloud.google.com/sdk/install).
```bash
# Install the gcloud sdk
$ ./google-cloud-sdk/install.sh

# Setup your credentials using the project from GCP
$ ./google-cloud-sdk/bin/gcloud init
```

Authenticate and log into the gcloud SDK with your project:
```bash
gcloud auth application-default login
gcloud auth login
```

## Development

For a development install (requires npm version 4 or later), do the following in the repository directory:

Install pipenv:
```bash
pip install pipenv
```

Change to the generate project directory:
```bash
cd my_extension/jupyter-extensions # Change this to the generated main directory
```

Install the gcs bigquery package:
```bash
pip install google-cloud-bigquery
```

Build, install, and launch run:
```bash
npm install && \
npm run bootstrap && \
pipenv shell && \
pipenv install && \
npm run link
```

Change to the extension directory:
```bash
cd jupyterlab_bigquery
npm run install-extension
```

Return to the main directory to run:
```bash
cd ..

# To start watch for backend: start the development server
npm run devserver

# To start watch for frontend: run npm start which starts the Typescript compiler 
# in watch mode on the extension directory
npm run watch
```


