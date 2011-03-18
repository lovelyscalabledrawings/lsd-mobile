/*
---
 
script: Body.Page.js
 
description: An in-page independent document (like iphone app page)
 
license: Public domain (http://unlicense.org).

authors: Yaroslaff Fedin
 
requires:
  - LSD.Mobile.Body.Page

provides:
  - LSD.Mobile.Body.Dialog

...
*/

LSD.Mobile.Body.Dialog = new Class({
  Includes: [
    LSD.Mobile.Body,
    LSD.Trait.Fieldset
  ],
  
  Stateful: Object.subset(LSD.States.Known, ['hidden']),
  
  options: {
    classes: ['page', 'dialog'],
    nodeType: 1,
    element: {
      tag: 'section'
    },
    events: {
      _dialog: {
        element: {
          'click:relay(.cancel)': 'cancel'
        }
      }
    },
    has: {
      one: {
        'form': {
          selector: 'form',
          chain: {
            'submission': function() {
              return {action: 'send', target: this.document}
            }
          }
        }
      }
    },
    pseudos: FastArray.compact('submittable')
  },
  
  cancel: function() {
    this.hide();
    this.fireEvent('cancel', arguments);
  },
  
  submit: function() {
    this.hide();
    this.fireEvent('submit', arguments);
  },
  
  getData: function() {
    var object = (this.form || this)
    return object.getData.apply(object, arguments);
  },
  
  hidden: true
});