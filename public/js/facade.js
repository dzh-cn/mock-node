$(function () {
	$('.facade-edit').click(function () {
		var id = $(this).attr('facadeId');
		if (id == null) {
			id = ''
		}
		$("#modal_facade_body").load('/facade/save?id=' + id);
		$('#facadeModal').modal({
			backdrop: false,
			keyboard: false,
		})
	})

	$('#saveProject').click(function () {
		$.ajax({
			url: $('#modal_facade_body form').attr('action'),
			// async: false,
			data: $('#modal_facade_body form').serialize(),
			dataType: 'json',
			method: 'post',
			error: function (a, b, c) {
				console.log('网络异常', a, b, c)
			},
			success: function (data) {
				console.log(data)
                if (data.success) {
                    location.reload();
                } else {
                    var clone = $('.save-alert-warning').clone()
                    $('.save-alert-warning').after(clone)
                    clone.find('.message').text(data.message + ' ' + data.time)
                    clone.find('.error').text(JSON.stringify(data.error))
					clone.removeClass('hidden save-alert-warning')
                    setTimeout(function (args) {
                        clone.hide(100, function () {
                            clone.remove()
                        })
					},2000);
				}
			}
		})
	})
})