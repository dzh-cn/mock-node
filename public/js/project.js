$(function () {
	$('.project-edit').click(function () {
		var id = $(this).attr('projectId');
		if (id == null) {
			id = ''
		}
		$("#modal_project_body").load('/project/save?id=' + id);
		$('#projectModal').modal({
			backdrop: false,
			keyboard: false,
		})
	})

	$('#saveProject').click(function () {
		$.ajax({
			url: $('#modal_project_body form').attr('action'),
			// async: false,
			data: $('#modal_project_body form').serialize(),
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