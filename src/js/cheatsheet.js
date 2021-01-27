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
  // var snippetModal = document.getElementById('modal-snippet')
  // snippetModal.addEventListener('hidden.bs.modal', function () {
  //   console.log("object")
  //   location.hash = ""
  // })

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

//---------------------- Copy ----------------------//

var copyAttr = $('.list-item-copy-attr'),
    copyCode = $('.list-item-copy-code'),
    copySnippet = $('.copy-snippet-code');

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
  var attrVal = $(this).data('clipboard-text');
  copyToClipboard(attrVal);
});

// Copy Code
copyCode.on('click', function (e) {
  e.stopPropagation()
  var codeSnippet = $(this).closest('.list-item').find('.code-snippet')[0].innerHTML;
  copyToClipboard(codeSnippet);
});

// Copy Code Snippet
copySnippet.on('click', function (e) {
  e.stopPropagation()
  var editor = ace.edit("editor");
  var sel = editor.selection.toJSON(); // save selection
  editor.selectAll();
  editor.focus();
  document.execCommand('copy');
});

//---------------------- ListItem Click ----------------------//

var listItemElement = $('.list-item');

// On click of list item
listItemElement.on('click',function(e){

  var $this = $(this),
  snippetTitle = $('.snippet-title');
  var codeSnippet = $this.find('.code-snippet')[0].innerHTML;
  snippetTitle.text($this.find('.item-filter-text')[0].innerHTML);

  listItemElement.removeClass("active");
  $this.addClass("active");

  // location.hash = $this.find('.list-item-text').attr("href")

  // if ( $this.find('.list-item-text').attr('href') == location.hash ) {
  //   e.preventDefault()
  // }


  // initialize editor
  var editor = ace.edit("editor");
  // editor.setTheme("ace/theme/twilight");
  editor.session.setMode("ace/mode/html");
  editor.setValue(codeSnippet);

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

  // Snippet Modal
  var snippetModal = new bootstrap.Modal(document.getElementById('modal-snippet'),{
    backdrop: false
  });
  if(!$('#modal-snippet').hasClass("show")){
    snippetModal.show()
  }
})

// Hash link redirection
function directHashLinkRedirect(){
  var hashItem= location.hash;
  if(location.hash.length > 0) {
    $(hashItem).trigger('click');
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

//---------------------- Initialize Tooltips ----------------------//
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
if (tooltipTriggerList) {
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })
}

//---------------------- Initialize Validation ----------------------//
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
