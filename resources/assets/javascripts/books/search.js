$('#search-book').on('keyup', function (e) {
    delay(function(){
        e.preventDefault();
        searchBooks();
    }, 500);
});

$('#search-book-google').on('keyup', function (e) {
    delay(function(){
        e.preventDefault();
        searchBooksGoogle();
    }, 500);
});

$('input[name="type-search"]').on('change', function (e) {
    e.preventDefault();
    searchBooks();
});

var delay = (function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();

function searchBooks() {
    if ($('#search-book').val() == "") {
        $('#data-search').empty();
    } else {
        $.ajax({
            url: API_PATH + 'search',
            contentType: 'application/json',
            dataType: 'json',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            type: 'POST',
            data: JSON.stringify({
                search: {
                    keyword: $('#search-book').val(),
                    field: $('input[name="type-search"]:checked').val()
                }
            }),
        }).done(function (response) {
            $('#data-search').empty();

            if (response.items.total) {
                response.items.data.forEach(function (book) {
                    $('#data-search').append(
                        '<li class="list-group-item">' +
                            "<div class='row'>" +
                                "<div class='col-md-12'>" +
                                    "<div class='media-left media-middle col-md-2 img-style'>" +
                                        "<a href='#'>" +
                                            "<img class='media-object-2 img-circle' src='http://placehold.it/40x40'>" +
                                        '</a>' +
                                    '</div>' +
                                    "<div class='col-md-10' id='center'>" +
                                        '<p><a href="/books/'+ book.id +'">' + book.title + '</a></p>' +
                                        '<p>Author #</p>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</li>'
                    );
                });
            } else {
                $('#data-search').append('<li><a href="#">Not found</a></li>');
            }
        }).fail(function (error) {
            $('#data-search').empty();
        });
    }
}

function searchBooksGoogle() {
    if ($('#search-book-google').val() == "") {
        $('#data-search-google').empty();
    } else {
        $.ajax({
            url: API_PATH + 'search-books?maxResults=20&q=' + $('#search-book-google').val(),
            contentType: 'application/json',
            dataType: 'json',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            type: 'GET',
        }).done(function (response) {
            $('#data-search-google').empty();

            if (response.items.length) {
                response.items.forEach(function (book) {
                    $('#data-search-google').append(
                        '<li class="list-group-item">' +
                            "<div class='row'>" +
                                "<div class='col-md-12'>" +
                                    "<div class='media-left media-middle col-md-2 img-style'>" +
                                        "<a href='#'>" +
                                            "<img class='media-object-2  img-circle' src='http://placehold.it/40x40'>" +
                                        '</a>' +
                                    '</div>' +
                                    "<div class='col-md-10' id='center'>" +
                                        '<p><a target="_blank" href="'+ book.volumeInfo.previewLink + '">' + book.volumeInfo.title + '</a></p>' +
                                        '<p>Author #</p>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</li>'
                    );
                });
            } else {
                $('#data-search-google').append('<li><a href="#">Not found</a></li>');
            }
        }).fail(function (error) {
            $('#data-search-googles').empty();
        });
    }
}
