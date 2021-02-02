// Categories shuffle variable
var Shuffle = window.Shuffle;

// filter & shuffle cards
class Demo {
  constructor(element) {
    this.element = element;
    // each item selector
    this.shuffle = new Shuffle(element, {
      itemSelector: ".category"
    });

    this.addSearchFilter();
  }

  // Advanced filtering
  addSearchFilter() {
    const searchInput = document.querySelector(".input-search");
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
    const searchText = evt.target.value.toLowerCase();
    var filteredItems = $(".item-filter-text");
      filteredItems.removeClass("cheatsheet-highlight");
    this.shuffle.filter((element, shuffle) => {
      let filteredItems = element.getElementsByClassName("item-filter-text");

      // Loop to add highlight class
      for (let filteredItem of filteredItems) {
        const titleText = filteredItem.textContent.toLowerCase().trim();
        if(titleText.indexOf(searchText) !== -1){
          if (searchText !== "") {
            filteredItem.classList.add("cheatsheet-highlight");
          }
        }
      }

      // Loop to show cards have searched options
      for (let index = 0; index < filteredItems.length; index++) {
        const filteredItem = filteredItems[index];
        const titleText = filteredItem.innerHTML.toLowerCase().trim();
        if(titleText.indexOf(searchText) !== -1){
          const filteredElements = element.getElementsByClassName("collapse")
          for (let filteredElement of filteredElements) {
            filteredElement.classList.add("show")
          }
          return true
        }
      }

    });
  }
}
// on link click
// $('.card-header a').on("click", function(event){
//   console.log("object")
//   event.stopPropagation();
// })

// On load event
document.addEventListener("DOMContentLoaded", () => {
  // To create grid
  window.demo = new Demo(document.getElementById("grid"));

  // On load redirection to hash link
  directHashLinkRedirect()

  // card shuffle on collapse show/hide
  var collapseItems = document.getElementsByClassName('collapse')
  for (let collapseItem of collapseItems) {
    collapseItem.addEventListener('shown.bs.collapse', function () {
      shuffleCategory()
    })
    collapseItem.addEventListener('hidden.bs.collapse', function () {
      shuffleCategory()
    })
  }

  // On modal close location hash clear
  var snippetModal = document.getElementById('modal-snippet')
  snippetModal.addEventListener('hidden.bs.modal', function (e) {
    history.replaceState(null, null, ' ');
    e.preventDefault()
  })
});

// On windows location/hash change
$(window).on('hashchange', function(e){
  directHashLinkRedirect()
});
//---------------------- Actions ----------------------//
// highlight New
// collapse
// expand
// shuffle

// Variables
var highlightNew = $("#btn-toggle-new"),
expandAll = $('#expandAll');
collapseAll = $('#collapseAll');

// Highlight BS New Items
highlightNew.on('click', function(){
  var newBsElem = $(".category.shuffle-item--visible .list-item-bs-new");
  if(!newBsElem.hasClass('show')){
    expandAll.trigger('click');
  }
  $('body').toggleClass("show-highlight");
});

// Collapse / Expand Toggle
expandAll.on('click', function(){
  expandAllCategory()
})
collapseAll.on('click', function(){
  collapseAllCategory()
  // remove highlight on collapse
  $('body').removeClass("show-highlight");
  highlightNew.prop("checked", false)
})

// To collapse all
function collapseAllCategory() {
  $('.category.shuffle-item--visible').find('.card-header').addClass("collapsed");
  $('.category.shuffle-item--visible').find('.collapse').removeClass("show");
  shuffleCategory()
}

// To expand all
function expandAllCategory() {
  $('.category.shuffle-item--visible').find('.collapse').addClass("show");
  $('.category.shuffle-item--visible').find('.card-header').removeClass("collapsed");
  shuffleCategory()
}

// To shuffle grid categories
function shuffleCategory() {
  var element = document.querySelector('#grid');
  var shuffleInstance = new Shuffle(element, {
    itemSelector: '.category.shuffle-item--visible'
  });
  shuffleInstance.filter();
}

//---------------------- Initialize Validation ----------------------//
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

  var forms = document.querySelectorAll('.needs-validation1')
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

//---------------------- Initialize Tooltips ----------------------//
function tooltipOnModal(){
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  if (tooltipTriggerList) {
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
  }
}

//---------------------- Initialize Popovers ----------------------//
function popoverOnModal(){
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    var popOverEle = new bootstrap.Popover(popoverTriggerEl)
    // popoverTriggerEl.toggleEnabled()
  })
}

// --------------------- on hover ------------------//

$('.list-item').on('mouseleave', function(e){
  $('.list-item-copy').remove();
});

$('.list-item').on('mouseenter', function(e){

  var $this = $(this),
  $html = "",
  $attr = "";
  if($($this).attr('data-clipboard-text')){
    $attr = $($this).attr('data-clipboard-text');
  }
  $this.find('.list-item-copy').remove();
  if($("body").hasClass('bs-mixins')){
    $html = `<div class="list-item-copy">
      <a class="list-item-copy-attr" data-original-title="Copy mixin name" data-bs-toggle="tooltip" title="Copy mixin name">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
          <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
        </svg>
      </a>
      <a class="list-item-copy-code" data-original-title="copy mixin to clipboard" data-bs-toggle="tooltip" title="Copy mixin to clipboard">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-code-slash" viewBox="0 0 16 16">
          <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z"/>
        </svg>
      </a>
    </div>`;
  }else{
    $html = `<div class="list-item-copy">`
    if($attr !== ""){
      $html +=  `<a class="list-item-copy-attr" data-original-title="copy to clipboard" data-clipboard-text="`+$attr+`" data-bs-toggle="tooltip" title="CSS class to clipboard">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
          <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
        </svg>
      </a>`
    }
    if(!($("body").hasClass('bs-variables'))){
      $html += `<a class="list-item-copy-code" data-original-title="copy snippet to clipboard" data-bs-toggle="tooltip" title="Code snippet to clipboard">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-code-slash" viewBox="0 0 16 16">
          <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z"/>
        </svg>
      </a>`
    }
    $html += `</div>`;
  }

  $this.find('.list-item-content').append($html);
  //---------------------- Copy ----------------------//

  var copyAttr = $('.list-item-copy-attr'),
  copyCode = $('.list-item-copy-code');

  // copy to clipboard function
  function copyToClipboard(element) {
    var $temp = $("<textarea>");
    $("body").append($temp);
    $temp.text(element).trigger('select');
    document.execCommand("copy");
    $temp.remove();
  }

  // copy attribute
  copyAttr.on('click', function (e) {
    e.stopPropagation()
    if($('body').hasClass("bs-mixins")){
      var attrVal = $(this).closest('.list-item').find('.code-snippet')[0].innerHTML;
    }else{
      var attrVal = $(this).data('clipboard-text');
    }
    copyToClipboard(attrVal);
  });

  // Copy Code
  copyCode.on('click', function (e) {
    e.stopPropagation()
    if($('body').hasClass("bs-mixins")){
      var codeSnippet = $(this).closest('.list-item').find('.code-snippet-full')[0].innerHTML;
    }else{
      var codeSnippet = $(this).closest('.list-item').find('.code-snippet')[0].innerHTML;
    }
    copyToClipboard(codeSnippet);
  });

  tooltipOnModal()
  popoverOnModal()
  // validationOnModal();

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

  var forms = document.querySelectorAll('.needs-validation1')
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

})


//---------------------- Copy Snippet ----------------------//

var copySnippet = $('.copy-snippet-code'),
  copyContent = $('.copy-info-code');

  var editor = ace.edit("editor");
  previewEditor = "";
  if($('#preview-editor').length){
    previewEditor = ace.edit("preview-editor");
  }

// Copy Code Snippet
copySnippet.on('click', function (e) {
  e.stopPropagation()
  var sel = editor.selection.toJSON(); // save selection
  editor.selectAll();
  editor.focus();
  document.execCommand('copy');
});

// Copy Code Snippet
copyContent.on('click', function (e) {
  e.stopPropagation()
  if(previewEditor !== ""){
    var sel = previewEditor.selection.toJSON(); // save selection
    previewEditor.selectAll();
    previewEditor.focus();
    document.execCommand('copy');
  }
});

//---------------------- ListItem Click ----------------------//

var listItemElement = $('.list-item'), snippetModal;

// Snippet Modal
snippetModal = new bootstrap.Modal(document.getElementById('modal-snippet'),{
  backdrop: false,
  keyboard: true,
  focus: false
});

// On click of list item
listItemElement.on('click',function(e){

  var $this = $(this),
  snippetTitle = $('.snippet-title');
  var codeSnippet = $this.find('.code-snippet')[0].innerHTML;
  if($this.find('.code-snippet-full').length){
    var codeSnippetFull = $this.find('.code-snippet-full')[0].innerHTML;
  }

  snippetTitle.text($this.find('.item-filter-text')[0].innerHTML);

  listItemElement.removeClass("active");
  $this.addClass("active");

  window.location = $this.find('.list-item-text').attr("href")

  // initialize editor
  // var editor = ace.edit("editor");
  // editor.setTheme("ace/theme/twilight");
  editor.session.setMode("ace/mode/html");
  editor.setValue(codeSnippet);

  if(previewEditor !== ""){
    previewEditor.session.setMode("ace/mode/html");
    if($this.find('.code-snippet-full').length){
      previewEditor.setValue(codeSnippetFull);
    }
  }


  // update preview on snippet change
  function updateCodeSnippet(){
    var customDemoClass = "";
    if($this.data("custom-class")){
      customDemoClass = $this.data("custom-class");
    }
    $('#preview').removeClass().addClass("bd-example "+customDemoClass)
    $('#preview').html(editor.getValue());
  }

  // on load update snippet with clicked attr
  updateCodeSnippet();

  // Update preview on editor input change
  editor.on("input", updateCodeSnippet);

  if(!$('#modal-snippet').hasClass("show")){
    // Update variable modal titles
    if($("body").hasClass('bs-variables')){
      $('#modal-snippet .modal-content-title').text("Variable Name")
      $('#modal-snippet .modal-content-code').text("Variable Value")
    }
    snippetModal.show();
  }

  // Method Calls for modal previews
  validationOnModal();
  popoverOnModal()
  tooltipOnModal();

})


// Hash link redirection
function directHashLinkRedirect(){
  var hashItem= location.hash;
  if(location.hash.length > 0) {
    $(hashItem).trigger('click');
  }else{
    snippetModal.hide()
  }
}

//---------------------- Next - Prev ----------------------//
$('.prev').on('click', function(){
  if($('.list-item.active').prev().length){
    $('.list-item.active').prev().trigger("click")
  }else{
    $('.list-item.active').closest('.category').prev('.shuffle-item--visible').find(".list-items .list-item:last-child").trigger("click");
    $('.list-item.active').closest('.category').find('.collapse').addClass("show")
  }
});

$('.next').on('click', function(){
  if($('.list-item.active').next().length){
    $('.list-item.active').next().trigger("click")
  }else{
    $('.list-item.active').closest('.category').next('.shuffle-item--visible').find(".list-items .list-item:first-child").trigger("click");
    $('.list-item.active').closest('.category').find('.collapse').addClass("show")
  }
});


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

// Scroll to top
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
