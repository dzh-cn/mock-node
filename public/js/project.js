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

	$('.project-delete').click(function () {
		var projectId = $(this).attr('projectId')

		$('#delete-dialog').modal('show')
		$('#delete-dialog .btn-primary').attr('projectId', projectId)
	})
	$('#delete-dialog .btn-cancel').click(function () {
		$('#delete-dialog').modal('hide')
	})

	$('#delete-dialog .btn-primary').click(function () {
		var projectId = $(this).attr('projectId')
		$.ajax({
			url: '/project/delete',
			// async: false,
			data: {id:projectId},
			dataType: 'json',
			method: 'get',
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
