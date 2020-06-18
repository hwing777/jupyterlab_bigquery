# Lint as: python3
"""Request handler classes for the extensions."""

import base64
import json
import re
import tornado.gen as gen
import os
import random

from collections import namedtuple
from notebook.base.handlers import APIHandler, app_log
from google.cloud import bigquery

# import google.auth
# from google.auth.exceptions import GoogleAuthError
# from google.auth.transport.requests import Request

from jupyterlab_cookies.version import VERSION


SCOPE = ("https://www.googleapis.com/auth/cloud-platform",)
client = bigquery.Client()
# resourceClient = resource_manager.Client()

def list_projects():
  project = client.project
  projectsList = [{
      'id': format(project),
      'datasets': list_datasets(),
    }]

  # I have 1064 projects - listing all projects not feasible
  # projects = list(client.list_projects())
  # projectsList = []
  # for project in projects:
  #   projectsList.append({
  #     'id': format(project),
  #     'datasets': list_datasets(),
  #   })

  return {'projects': projectsList}

def list_datasets():
  datasets = list(client.list_datasets())
  
  datasetsList = []
  for dataset in datasets:
    dataset_id = dataset.dataset_id
    currDataset = client.get_dataset(dataset_id)

    datasetsList.append({
      'id': format(dataset.dataset_id),
      'tables': list_tables(currDataset),
      'models': list_models(currDataset),
    })
  return datasetsList

def list_tables(dataset):
  tables = list(client.list_tables(dataset))
  return [{
    'id': format(table.table_id),
  } for table in tables]

def list_models(dataset):
  models = list(client.list_models(dataset))
  return [{
    'id': format(model.model_id),
  } for model in models]

class ListHandler(APIHandler):
  """Handles requests for Dummy List of Items."""
  bigquery_client = None
  parent = None

  @gen.coroutine
  def post(self, *args, **kwargs):
    try:
      self.finish(list_projects())

    except Exception as e:
      app_log.exception(str(e))
      self.set_status(500, str(e))
      self.finish({
        'error':{
          'message': str(e)
          }
        })