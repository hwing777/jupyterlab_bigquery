# Notebook BigQuery Extension

This is the codebase for the BigQuery extension in JupyterLab.

## Prerequisites

A cloud project must already exist in the Cloud Console.

* Python 3.5+
* [JupyterLab](https://jupyterlab.readthedocs.io/en/stable/getting_started/installation.html)
* [Virtualenv](https://virtualenv.pypa.io/en/latest/) (Recommended for local development)
* [NPM](https://nodejs.org/en/) (For local development)

## GCP Installation

Requires gcloud from the Google Cloud SDK to be [installed](https://cloud.google.com/sdk/install).

```bash
# Install the gcloud sdk
$ ./google-cloud-sdk/install.sh

# Setup your credentials using the project from GCP
$ ./google-cloud-sdk/bin/gcloud init
```

## Development

For a development install (requires npm version 4 or later), do the following in the repository directory:

You will need to have Python3, virtualenv, and npm installed.

```bash
# Create a Python 3 virtualenv and install jupyterlab and the project in edit mode
virtualenv -p python3 venv
source venv/bin/activate

# Authenticate the gcloud SDK
gcloud auth application-default login
gcloud auth login

# Install the version of jupyterlab used by DLVM images
pip install jupyterlab==1.2.6 && \
pip install .

# Install the npm package and the extension
npm install && \
npm run build && \
jupyter labextension install . --no-build && \
jupyter lab build

# Running watch for frontend: Run npm start which starts the Typescript compiler 
# in watch mode on the extension directory as well as the JupyterLab server
npm start

# Running watch for backend: first copy the JupyterLab extension config file into
# the venv/etc/jupyter/jupyter_notebook_config.d/ directory and install with pip
# From the extension root directory
cp jupyter-config/jupyter_notebook_config.d/*.json \
    venv/etc/jupyter/jupyter_notebook_config.d/
pip install -e .
npm run devserver
```


