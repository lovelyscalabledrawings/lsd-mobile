/*
---
 
script: Application.js
 
description: Paged mobile application wrapper
 
license: Public domain (http://unlicense.org).

authors: Yaroslaff Fedin
 
requires:
  - Mobile/LSD.Mobile.Body.Page
  - LSD/LSD.Document
  
provides:
  - LSD.Mobile.Document
 
...
*/

LSD.Mobile.Document = new Class({
  Extends: LSD.Document,
  
  build: function() {
    this.parent.apply(this, arguments);
    if (this.loading) {
      this.loading.show();
      this.loading.element.removeClass('loading');
      delete this.loading;
    }
  },
  
  setBody: function(element) {
    var pages = LSD.Slick.search(element, "> section.page");
    if (pages.length) pages.each(this.setPage.bind(this))
    else this.setPage(element)
  },
  
  setPage: function(element) {
    var page = this.page = LSD.Application.prototype.setBody.apply(this, arguments);
    if (!this.pages) this.pages = [];
    this.pages.push(page);
    if (element.hasClass("current")) this.current = page;
    else page.hidden = true;
    if (element.hasClass("loading")) this.loading = page;
    return page;
  },
  
  setCurrentPage: function(page, transformation, reverse) {
    if (reverse == null) reverse = !!transformation;
    if (!transformation) transformation = page.options.transformation;
    if (transformation && this.current) {
      this.current.element.addClass('out').addClass(transformation.name);
      if (reverse) this.current.addClass('reverse');
    }
    page.addClass('current')
    if (reverse) page.addClass('reverse');
    page.element.addClass('in').addClass(transformation.name);
    !function() {
      if (transformation) {
        this.current.element.removeClass('out').removeClass(transformation.name).removeClass('current')
        page.element.removeClass('in').removeClass(transformation.name);
      }
      this.previous = this.current;
      if (reverse) {
        if (this.current) this.current.removeClass('reverse');
        page.removeClass('reverse');
      }
      this.current = page;
      this.lastTransformation = transformation;
    }.delay(transformation.duration || transformation.durations[transformation.name], this);
  },
  
  back: function() {
    if (this.previous) this.setCurrentPage(this.previous, this.lastTransformation);
  }
});