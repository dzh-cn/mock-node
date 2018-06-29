$(function () {
	$('.project-edit').click(function () {
		var id = $(this).attr('projectId');
		if (id == null) {
			id = ''
		}
		$("#modal_project_body").load('save?id=' + id);
		$('#projectModal').modal({
			backdrop: false,
			keyboard: false,
		})
	})

	$('#saveProject').click(function () {
		$.ajax({
			url: '/project/save.biz',
			async: false,
			data: $('#modal_project_body form').serialize(),
			dataType: 'json',
			method: 'post',
			error: function (a, b, c) {
				console.log('网络异常', a, b, c)
			},
			success: function (data) {
				console.log(data)
				location.reload()
			}
		})
	})
})