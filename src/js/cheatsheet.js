"use strict"
//---------------------- Shuffle Filter ----------------------//

// Categories shuffle variable
var Shuffle = window.Shuffle,
assetsPath = "assets/images";

// filter & shuffle cards
class Demo {
  constructor(element) {
    this.element = element;
    // each item selector
    this.shuffle = new Shuffle(element, {
      itemSelector: ".category"
    });

    this.advSearchFilter();
  }

  // Advanced filtering
  advSearchFilter() {
    var searchInput = document.querySelector(".input-search");
    if (!searchInput) {
      return;
    }
    searchInput.addEventListener("keyup", this._handleSearchKeyup.bind(this));
  }

  /**
   * Filter the shuffle instance by items with a title that matches the search input.
   * @param {Event} evt Event object.
   */
  _handleSearchKeyup(evt) {
    var searchText = evt.target.value.toLowerCase();
    var totalItems = 0;
    var filteredItems = $(".item-filter-text");
      filteredItems.removeClass("cheatsheet-highlight");
    this.shuffle.filter((element, shuffle) => {
      var filteredItems = element.getElementsByClassName("item-filter-text");

      // Loop to add highlight class
      for (var filteredItem of filteredItems) {
        var titleText = filteredItem.textContent.toLowerCase().trim();
        if(titleText.indexOf(searchText) !== -1){
          if (searchText !== "") {
            filteredItem.classList.add("cheatsheet-highlight");
          }
        }
      }

      // Loop to show cards have searched options
      for (var index = 0; index < filteredItems.length; index++) {
        var filteredItem = filteredItems[index];
        var titleText = filteredItem.innerHTML.toLowerCase().trim();
        if(titleText.indexOf(searchText) !== -1){
          totalItems = totalItems + 1;
          var filteredElements = element.getElementsByClassName("collapse")
          for (var filteredElement of filteredElements) {
            filteredElement.classList.add("show")
          }
          return true
        }
      }
    });
    if(totalItems === 0){
      $('.no-search-items').removeClass("d-none");
    }else{
      $('.no-search-items').addClass("d-none");
    }
  }
}

// On load eventListener
document.addEventListener("DOMContentLoaded", () => {
  // To create grid
  window.demo = new Demo(document.getElementById("grid"));

  // On load focus on search
  var searchInput = document.querySelector(".input-search");
  searchInput.focus();

  // On load redirection to hash link
  directHashLinkRedirect()

  // tooltip initialized
  tooltipOnModal();

  // card shuffle on collapse show/hide
  var collapseItems = document.getElementsByClassName('collapse')
  for (var collapseItem of collapseItems) {
    collapseItem.addEventListener('shown.bs.collapse', function () {
      shuffleCategory()
    })
    collapseItem.addEventListener('hidden.bs.collapse', function () {
      shuffleCategory()
    })
  }
});

// To shuffle grid categories
function shuffleCategory() {
  var element = document.querySelector('#grid');
  var shuffleInstance = new Shuffle(element, {
    itemSelector: '.category.shuffle-item--visible'
  });
  shuffleInstance.filter();
}

// On windows location/hash change
$(window).on('hashchange', function(e){
  directHashLinkRedirect()
});

// Initializing Editors
var editor = ace.edit("editor"),
previewEditor = "";
// initialize editor
// editor.session.setMode();
editor.setOptions({
  fontSize: "14px",
  theme: "ace/theme/eclipse",
  mode: "ace/mode/html"
});

if($('#preview-editor').length){
  previewEditor = ace.edit("preview-editor");
  previewEditor.setOptions({
    fontSize: '14px',
    theme: "ace/theme/chrome"
  })
}

//---------------------- Functions / Methods ----------------------//

// replace id="value" with id="value1"
// same replaced for all the attributes listed below
// For: Form, accordion, button plugin, navigation in card, list-group > javascript behavior, tabs & pills, scrollspy
function updateHTMLSnippet(htmlSnippet){
  // htmlSnippet = htmlSnippet.replace(/(\s(for|id)=")([\w-]*)(")/g, "$1$31$4");
  htmlSnippet = htmlSnippet.replace(/(\s(for|id|data-bs-target|aria-controls|aria-labelledby|data-bs-parent|href)=")(#?[\w-]+)(")/g, "$1$31$4");
  return htmlSnippet;
}

var listItemElement = $('.list-item'), snippetModal, codeSnippet, codeSnippetFull;

// Snippet Modal Initialization
snippetModal = new bootstrap.Modal(document.getElementById('modal-snippet'),{
  backdrop: false,
  keyboard: true,
  focus: false
});

function updateCodeSnippet(snippetVal){
  var customDemoClass = "",
  $this = snippetVal;
  if($this.data("custom-class")){
    customDemoClass = $this.data("custom-class");
  }
  $('#preview').removeClass().addClass("bd-example "+customDemoClass)
  if($this.data("id-update")){
    $('#preview').html(updateHTMLSnippet(editor.getValue()));
  }else{
    $('#preview').html(editor.getValue());
  }
}

// To dispose tooltips
function tooltipDispose(){
  $('.tooltip.show').remove()
}
// To dispose popovers
function popoverDispose(){
  $('.popover.show').remove()
}

// On click/load of list item OR on hashchange
function loadListItem(sStrippedHash){

  // dispose popover if already exist
  popoverDispose();
  // dispose tooltip if already exist
  tooltipDispose();

  var $this = $("[data-id='"+ sStrippedHash+"']"),
  snippetTitle = $('.snippet-title');
  codeSnippet = $this.find('.code-snippet')[0].innerHTML;
  if($this.find('.code-snippet-full').length){
    codeSnippetFull = $this.find('.code-snippet-full')[0].innerHTML;
  }

  snippetTitle.text($this.find('.item-filter-text')[0].innerHTML);

  listItemElement.removeClass("active");
  $this.addClass("active");

  $('.list-item.active').closest('.category').find('.collapse').addClass('show')
  $('.list-item.active').closest('.category').find('.card-header').removeClass('collapsed')

  shuffleCategory()

  window.location = $this.find('.list-item-text').attr("href")

  editor.setValue(codeSnippet);

  if(previewEditor !== ""){
    editor.session.setMode("ace/mode/scss");
    editor.setTheme("ace/theme/chrome");
    previewEditor.session.setMode("ace/mode/scss");
    if($this.find('.code-snippet-full').length){
      previewEditor.setValue(codeSnippetFull);
    }
  }

  updateCodeSnippet($this)

  if(!$('#modal-snippet').hasClass("show")){
    // Update variable modal titles
    if($("body").hasClass('bs-variables')){
      $('#modal-snippet .modal-content-title').text("Variable Name")
      $('#modal-snippet .modal-content-code').text("Variable Value")
    }
    snippetModal.show();
  }

  // Method Calls for modal previews
  tooltipOnModal()
  popoverOnModal()
  validationOnModal();
  toastOnModal()
}

editor.on("change", function(){
  if(location.hash){
    updateCodeSnippet($(location.hash))
  }
});

// To collapse all cards
function collapseAllCategory() {
  $('.category.shuffle-item--visible').find('.card-header').addClass("collapsed");
  $('.category.shuffle-item--visible').find('.collapse').removeClass("show");
  shuffleCategory()
}

// To expand all cards
function expandAllCategory() {
  $('.category.shuffle-item--visible').find('.collapse').addClass("show");
  $('.category.shuffle-item--visible').find('.card-header').removeClass("collapsed");
  shuffleCategory()
}

// Initialize Validation
function validationOnModal(){
  var forms = document.querySelectorAll('.needs-validation')
  Array.prototype.slice.call(forms)
  .forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      form.classList.add('was-validated')
    }, false)
  })
}

// Initialize Tooltips
function tooltipOnModal(){
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  if (tooltipTriggerList) {
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
  }
}

// Initialize Popovers
function popoverOnModal(){
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
  if (popoverTriggerList) {
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl)
    })
  }
}

// Initialize Toasts
function toastOnModal(){
  var toastElList = [].slice.call(document.querySelectorAll('.toast-demo'))
  if (toastElList) {
    var toastList = toastElList.map(function (toastEl) {
      return new bootstrap.Toast(toastEl, {
        autohide: false
      }).show()
    })
  }
}

// Hash link redirection
function directHashLinkRedirect(){
  var hashItem = location.hash.replace('#', '');
  if(location.hash.length > 0) {
    // $(hashItem).trigger('click');
    loadListItem(hashItem);
  }else{
    snippetModal.hide()
  }
}

// On copied, show toast
function copyToast(){
  var toastNotiList = [].slice.call(document.querySelectorAll('.notification-toast'))
  var toastNotiList = toastNotiList.map(function (toastNotiEl) {
    return new bootstrap.Toast(toastNotiEl, {
      autohide: true,
      delay: 2000
    }).show()
  })
}

$(function(){

  // On modal close location hash clear
  var snippetModal = document.getElementById('modal-snippet')
  snippetModal.addEventListener('hidden.bs.modal', function (e) {
    history.replaceState(null, null, ' ');
    e.preventDefault()
  })

  //---------------------- Actions ----------------------//
  // highlight New, collapse all, expand all

  // Variables
  var highlightNew = $("#btn-toggle-new"),
  expandAll = $('#expandAll'),
  collapseAll = $('#collapseAll');

  // Highlight BS New Items
  highlightNew.on('click', function(){
    var newBsElem = $(".category.shuffle-item--visible .list-item-bs-new");
    if(!newBsElem.hasClass('show')){
      expandAll.trigger('click');
    }
    $('body').toggleClass("show-highlight");
  });

  // Expand All click event
  expandAll.on('click', function(){
    expandAllCategory()
  })
  // Collapse All click event
  collapseAll.on('click', function(){
    collapseAllCategory()
    // remove highlight on collapse
    $('body').removeClass("show-highlight");
    highlightNew.prop("checked", false)
  })

  // --------------------- on mouseenter / mouseleave events ------------------//

  // On mouseleave, remove list item's copy icons
  $('.list-item').on('mouseleave', function(e){
    $('.list-item-copy').remove();
    tooltipDispose()
  });

  // On mouseenter, add icons to list item
  $('.list-item').on('mouseenter', function(e){

    var $this = $(this),
    $html = "",
    $attr = "",
    $attrImage,$codeImage;
    if($($this).attr('data-clipboard-text')){
      $attr = $($this).attr('data-clipboard-text');
    }
    $this.find('.list-item-copy').remove();

    if($($this).hasClass('active') || $($this).hasClass('list-item-bs-new')){
      $attrImage = 'files-white.png'
      $codeImage = 'code-slash-white.png'
    }else{
      $attrImage = 'files.png'
      $codeImage = 'code-slash.png'
    }

    if($("body").hasClass('bs-mixins')){
      // For mixins page icons
      $html = `<div class="list-item-copy">
        <a class="list-item-copy-attr" data-original-title="Copy mixin name" data-bs-toggle="tooltip" title="Copy mixin name">
          <img src="`+assetsPath+`/fonts/`+$attrImage+`" alt="Copy code">
        </a>
        <a class="list-item-copy-code" data-original-title="copy mixin to clipboard" data-bs-toggle="tooltip" title="Copy mixin to clipboard">
          <img src="`+assetsPath+`/fonts/`+$codeImage+`" alt="Copy snippet">
        </a>
      </div>`;
    }else{
      // For classes page icons & variables
      $html = `<div class="list-item-copy">`
      if($attr !== ""){
        $html +=  `<a class="list-item-copy-attr" data-original-title="copy to clipboard" data-clipboard-text="`+$attr+`" data-bs-toggle="tooltip" title="CSS class to clipboard">
          <img src="`+assetsPath+`/fonts/`+$attrImage+`" alt="Copy code">
        </a>`
      }
      if(!($("body").hasClass('bs-variables'))){
      // not used this icon on variables
        $html += `<a class="list-item-copy-code" data-original-title="copy snippet to clipboard" data-bs-toggle="tooltip" title="Code snippet to clipboard">
          <img src="`+assetsPath+`/fonts/`+$codeImage+`" alt="Copy snippet">
        </a>`
      }
      $html += `</div>`;
    }

    $this.find('.list-item-content').append($html);

    //---------------------- Copy ----------------------//
    var copyAttr = $('.list-item-copy-attr'),
    copyCode = $('.list-item-copy-code');

    /**
     * copy to clipboard function
     * @param {element} element HTML string.
     */
    //
    function copyToClipboard(element) {
      var $temp = $("<textarea>");
      $("body").append($temp);
      $temp.text(element).trigger('select');
      document.execCommand("copy");
      $temp.remove();

      copyToast();
    }

    // copy attribute on icon click
    copyAttr.on('click', function (e) {
      e.stopPropagation()
      if($('body').hasClass("bs-mixins")){
        var attrVal = $(this).closest('.list-item').find('.code-snippet')[0].innerHTML;
      }else{
        var attrVal = $(this).data('clipboard-text');
      }
      copyToClipboard(attrVal);
    });

    // Copy Code of mixins and variables on icon click
    copyCode.on('click', function (e) {
      e.stopPropagation()
      if($('body').hasClass("bs-mixins")){
        var codeSnippet = $(this).closest('.list-item').find('.code-snippet-full')[0].innerHTML;
      }else{
        var codeSnippet = $(this).closest('.list-item').find('.code-snippet')[0].innerHTML;
      }
      copyToClipboard(codeSnippet);
    });

    // tooltip of list item copy icons
    tooltipOnModal();
  })

  //---------------------- Copy Snippet ----------------------//

  var copySnippet = $('.copy-snippet-code'),
    copyContent = $('.copy-info-code');

  // Copy Code Snippet for classes
  copySnippet.on('click', function (e) {
    e.stopPropagation()
    var sel = editor.selection.toJSON(); // save selection
    editor.selectAll();
    editor.focus();
    document.execCommand('copy');
    copyToast();
  });

  // Copy Code Snippet of mixins and variables
  copyContent.on('click', function (e) {
    e.stopPropagation()
    if(previewEditor !== ""){
      var sel = previewEditor.selection.toJSON(); // save selection
      previewEditor.selectAll();
      previewEditor.focus();
      document.execCommand('copy');
      copyToast();
    }
  });


  //---------------------- Next - Prev ----------------------//
  var idName;
  $('.prev').on('click', function(){
    if($('.list-item.active').prev().length){
      idName = $('.list-item.active').prev().attr('data-id')
      if(idName){
        window.location.hash = "#"+idName;
      }
    }else{
      idName = $('.list-item.active').closest('.category').prev('.shuffle-item--visible').find(".list-items .list-item:last-child").attr('data-id');
      $('.list-item.active').closest('.category').find('.collapse').addClass("show")
      if(idName){
        window.location.hash = "#"+idName;
      }
    }
  });

  $('.next').on('click', function(){
    if($('.list-item.active').next().length){
      idName = $('.list-item.active').next().attr('data-id')
      if(idName){
        window.location.hash = "#"+idName;
      }
    }else{
      idName = $('.list-item.active').closest('.category').next('.shuffle-item--visible').find(".list-items .list-item:first-child").attr('data-id');
      $('.list-item.active').closest('.category').find('.collapse').addClass("show")
      if(idName){
        window.location.hash = "#"+idName;
      }
    }
  });

})

// On keyup events
// on esc, hide modals
// Next - Prev on arrow click
$(document).on('keyup', function(e) {
  if($('body').hasClass('modal-open')){
    var key = e.keyCode || e.charCode || e.which;
    switch (key) {
      case 27:
        snippetModal.hide()
        break;
      case 37:
        if(!editor.isFocused()){
          $('.prev').trigger('click');
        }
        break;
      case 39:
        if(!editor.isFocused()){
          $('.next').trigger('click');
        }
    }
  }
});


//---------------------- Scroll to top ----------------------//
$(window).on('scroll', function () {
  if ($(this).scrollTop() > 500) {
    $('.scroll-top').fadeIn();
  } else {
    $('.scroll-top').fadeOut();
  }
});
$('.scroll-top').on('click', function () {
  $('html, body').animate({ scrollTop: 0 }, 100);
  if (snippetModal) {
    snippetModal.hide();
  }
});
