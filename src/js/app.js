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
      filteredItems.removeClass("highlight");
    this.shuffle.filter((element, shuffle) => {
      let filteredItems = element.getElementsByClassName("item-filter-text");

      // Loop to add highlight class
      for (let filteredItem of filteredItems) {
        const titleText = filteredItem.textContent.toLowerCase().trim();
        if(titleText.indexOf(searchText) !== -1){
          if (searchText !== "") {
            filteredItem.classList.add("highlight");
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

// On load event
document.addEventListener("DOMContentLoaded", () => {
  // To create grid
  window.demo = new Demo(document.getElementById("grid"));

  // To shuffle on collapse and expand
  var collapseItems = document.getElementsByClassName('collapse')
  for (let collapseItem of collapseItems) {
    collapseItem.addEventListener('shown.bs.collapse', function () {
      shuffleCategory()
    })
    collapseItem.addEventListener('hidden.bs.collapse', function () {
      shuffleCategory()
    })
  }
});


// Variables
var highlightNew = $("#btn-toggle-new"),
collapseElement = $('.collapse'),
listItemElement = $('.list-item'),
expandAll = $('#expandAll');
collapseAll = $('#collapseAll');

// Highlight BS New Items
highlightNew.on('click', function(){
  var newBsElems = $(".list-item-bs-new");
  if(!newBsElems.hasClass('show')){
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
  $('body').removeClass("show-highlight");
  highlightNew.prop("checked", false)
})
// To collapse all
function collapseAllCategory() {
  collapseElement.removeClass("show");
  shuffleCategory()
}

// To expand all
function expandAllCategory() {
  collapseElement.addClass("show");
  shuffleCategory()
}

// To shuffle grid categories
function shuffleCategory() {
  var element = document.querySelector('#grid');
  var shuffleInstance = new Shuffle(element, {
    itemSelector: '.category'
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
  console.log(element)
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
  editor.selectAll();
  copyToClipboard(editor.getValue())
  document.execCommand('copy');
});

// On click of list item
listItemElement.on('click',function(){

  var $this = $(this),
  codeSnippet = $this.find('.code-snippet')[0].innerHTML;

  listItemElement.removeClass("active");
  $this.addClass("active");

  // initialize editor
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/twilight");
  editor.session.setMode("ace/mode/html");
  editor.setValue(codeSnippet);

  // update preview on snippet change
  function updateCodeSnippet(){
    $('#preview').html(editor.getValue());
  }

  // on load update snippet with clicked attr
  updateCodeSnippet();

  // Update preview on editor input change
  editor.on("input", updateCodeSnippet);

  // Snippet Modal
  var snippetModal = new bootstrap.Modal(document.getElementById('modal-snippet'));
  snippetModal.show()
})
