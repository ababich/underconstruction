window.ps_gallery = {}

$(document).ready(function() {

  var wrapper = $('#fullpage')
  var menu = $('#menu')

  var pswpElement = $('.pswp')[0]
  var options = {
    // optionName: 'option value'
    // for example:
    index: 0, // start at first slide
    history: false,
    preload: [1, 2]
  };


  // generate sections
  $.each(window.pages, function(key, page) {

    var section = $('<div />', {
      id: key + '_id',
      'data-anchor': key,
      class: 'section'
    })
    .css({
      'background-image': 'url(img/' + key + '/bg.jpg)'
    })
    section.appendTo(fullpage)

    var section_panel = $('<div />', {
      class: 'panel'
    }).html(page['section_content'])
    section_panel.appendTo(section)

    var li = $('<li />', {
      id: key + '_menu_li',
      'data-menuanchor': key
    })
    li.appendTo(menu)

    var link = $('<a />', {
      id: key + '_menu_li_a',
      href: '#' + key,
      text: page['menu_title']
    })
    link.appendTo(li)

    // init gallery
    var images = $.map(page.images, function(image) {
      var [w, h] = image['size'].split('x')
      return {
        src: 'img/' + key + '/' + image['file_prefix'] + '.jpg',
        w: w,
        h: h
      }
    })


    section.click(function(e) {
      e.preventDefault()

      var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, images, options)
      gallery.init()
    })
  })


  // init FullPage
  $('#fullpage').fullpage({
    verticalCentered: false,
    continuousVertical: true,
    menu: menu,
    css3: false
  })

})
