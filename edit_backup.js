  <script>
     $(document).on('click', '.openEditModal', function () {
    const id = $(this).data('id');
    const name = $(this).data('name');
    const price = $(this).data('price');
    const status = $(this).data('status');
    const image = $(this).data('image');
    const discount = $(this).data('discount');
    const description = $(this).data('description');

    //console.log(price)
 $('#edit_id').val(id);
    $('#edit_name').val(name);
    $('#edit_price').val(price);
    $('#edit_Description').val(description);
    $('#edit_image_preview').attr('src', image).show();
    $('#edit_Discount').val(discount)

                let options
                options +=`<option value="${discount}">${discount}</option>`
                $('#edit_Discount').html(options)

                 $('#edit_status').val(status)

                let optionsstatus
                optionsstatus +=`<option value="${status}">${status}</option>`
                $('#edit_status').html(optionsstatus)


    const editModal1 = new bootstrap.Modal(document.getElementById('edit'));
   // console.log(editModal1)
    editModal1.show();

    
});
    
$('#edit_btn').click(function(e) {
    e.preventDefault();
    const id = $('#edit_id').val();
    
    // Create FormData and append fields
    const formData = new FormData();
   formData.append('_method', 'PUT');// Laravel needs this for PUT via FormData
    formData.append('name', $('#edit_name').val());
    formData.append('price', $('#edit_price').val());
    formData.append('Discount', $('#edit_discount').val());
    formData.append('status', $('#edit_status').val());
    formData.append('Description', $('#edit_description').val());
    
    // Append file if selected
    if ($('#edit_image')[0].files[0]) {
        formData.append('image', $('#edit_image')[0].files[0]);
    }

// Debug: log all formData entries
for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
}

    $.ajax({
        method: 'POST', // MUST be POST when using FormData + _method=PUT
        url: `http://localhost:8000/api/products/${id}`,
        data: formData,
        processData: false, // Required for FormData
          contentType: false,
            headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json'
        },
        success: function(response) {
            $('#success-alert').show();
            $('#success-message').text(response.message);
            setTimeout(() => $('#success-alert').hide(), 3000);
            $('#add').modal('hide');
            window.location.reload();
        },
        error: function(error) {
            $('#error-alert').show();
            $('#error-message').text(error.responseJSON.message || 'Error updating product.');
            setTimeout(() => $('#error-alert').hide(), 3000);
            console.error("Error:", error);
        }
    });
});
  </script>