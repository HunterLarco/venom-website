from google.appengine.ext.webapp import template
import webapp2
import os

from google.appengine.ext import ndb
import json


class DemoDayVisitor(ndb.Model):
  email   = ndb.StringProperty(indexed=True, required=True)
  company = ndb.StringProperty(indexed=True)
  
  def to_dict(self):
    return {
      'email': self.email,
      'company': self.company
    }


class EmailHandler(webapp2.RequestHandler):
  def get(self):
    visitors = DemoDayVisitor.query()
    dumps = map(lambda visitor: visitor.to_dict(), visitors)
    self.response.write(json.dumps({
      'success': True,
      'visitors': dumps
    }))
  
  def post(self):
    try:
      body = json.loads(self.request.body)
      email = body['email']
      if not email: raise Exception('Email not provided')
      company = body['company'] if 'company' in body else None
      key = ndb.Key('DemoDayVisitor', email)
      visitor = DemoDayVisitor(email=email, company=company, key=key)
      visitor.put()
      self.response.write(json.dumps({
        'success': True,
        'visitor': visitor.to_dict()
      }))
    except:
      self.response.write(json.dumps({
        'success': False
      }))
  
  def put(self):
    try:
      body = json.loads(self.request.body)
      email = body['email']
      key = ndb.Key('DemoDayVisitor', email)
      visitor = key.get()
      company = body['company'] if 'company' in body else None
      visitor.company = company
      visitor.put()
      self.response.write(json.dumps({
        'success': True,
        'visitor': visitor.to_dict()
      }))
    except:
      self.response.write(json.dumps({
        'success': False
      }))


class DefaultHandler(webapp2.RequestHandler):
  def get(self):
    template_values = {}
    path = os.path.join(os.path.dirname(__file__), 'templates/landing.html')
    self.response.out.write(template.render(path, template_values))


app = webapp2.WSGIApplication([
  ('/api/v1/emails/?', EmailHandler),
  ('.*', DefaultHandler)
])