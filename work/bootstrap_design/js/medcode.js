$(function() {
	$('.button .version').on('mouseenter', function() {
  	$(this).find('ul').show();
  });
  
$('.button ul').on('mouseleave', function() {
    $(this).hide();
});

  $('.button li').on('click', function(e) {
  	$(this).find('.version > span').text(e.target.innerText);
    $(this).find('.button ul').hide();
  });
});