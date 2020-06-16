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

import google.auth
from google.auth.exceptions import GoogleAuthError
from google.auth.transport.requests import Request

from jupyterlab_cookies.version import VERSION


SCOPE = ("https://www.googleapis.com/auth/cloud-platform",)


words = """yawn rose draw wave install plot slope prepare cause glow
macho impinge found society icicle boast capable sophisticated improve
high circle
""".title().split()

def generate_data(num):
  return {
    'words': [{
      'id': i,
      'name': ''.join(random.sample(words,3))
    } for i in range(num)]
  }

def generate_names():
  client = bigquery.Client()
  QUERY = (
    'SELECT name FROM `bigquery-public-data.usa_names.usa_1910_2013` '
    'WHERE state = "TX" '
    'LIMIT 20')
  query_job = client.query(QUERY)  # API request
  rows = query_job.result()  # Waits for query to finish
  i = 1
  return {
    'words': [{
      'id': i,
      'name': row.name,
    } for row in rows]
  }

def list_datasets():
  client = bigquery.Client()
  datasets = list(client.list_datasets())
  project = client.project

  if datasets:
    words = []
    for dataset in datasets:
      words.append({
        'id': format(dataset.dataset_id),
        'name': format(dataset.dataset_id),
        'tables': list_tables(client, dataset),
      })
    return {'words': words}
  else:
      return {
        'words': {
          'id': 1,
          'name': "{} project doesn't contain any datasets.".format(project),
        }
      }

def list_tables(client, dataset):
  dataset_id = dataset.dataset_id
  currDataset = client.get_dataset(dataset_id)
  tables = list(client.list_tables(currDataset))
  return [{
    'name': format(table.table_id),
  } for table in tables]



class ListHandler(APIHandler):
  """Handles requests for Dummy List of Items."""
  bigquery_client = None
  parent = None

  @gen.coroutine
  def post(self, *args, **kwargs):

    try:

      # self.finish(generate_names())
      self.finish(list_datasets())

    except Exception as e:
      app_log.exception(str(e))
      self.set_status(500, str(e))
      self.finish({
        'error':{
          'message': str(e)
          }
        })