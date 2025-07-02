
    $(document).ready(function(){
        
$('#save').click(function(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', $('#name').val());
    formData.append('price', $('#price').val());
    formData.append('Discount', $('#Discount').val());
    formData.append('status', $('#status').val());
    formData.append('Description', $('#Description').val());
    formData.append('image', $('#image')[0].files[0]); // real file

    $.ajax({
        method: 'POST',
        url: 'http://localhost:8000/api/products',
        data: formData,
        processData: false,           // REQUIRED
        contentType: false,
        dataType: 'json',           // REQUIRED
        success: function(response) {
            $('#success-alert').show();
            $('#success-message').text(response.message);
            setTimeout(() => $('#success-alert').hide(), 3000);
            $('#add').modal('hide');
            window.location.reload();
console.log(response.responseText)
        },
        error: function(error) {
            $('#error-alert').show();
            $('#error-message').text(error.responseText);
            setTimeout(() => $('#error-alert').hide(), 3000);
            $('#add').modal('hide');
            console.log(error)
        }
    });
});

   


        ///end of saving Products Deatails


         $.ajax({
            method:'GET',
            url:`http://localhost:8000/api/products?page=1`,
            dataType:'json',
              success:function(response){
             
              let tbody=$('#table_body');
              tbody.empty();
              response.data.data.forEach(function(details)
          
            {
              tbody.append(`
               <tr id="row-${details.id}">
                                   
                                  <td class="productimgname">
  <a href="javascript:void(0);" class="product-img">
    <img src="${details.image}" alt="product" />
  </a>
  <a href="javascript:void(0);">${details.name}</a>
</td>

                                    <td>${details.price}</td>
                                    <td>${details.created_at}</td>
                                    <td>
                                        <ul class="list-inline mb-0">
                                             <li class="list-inline-item">
          <a href="javascript:void(0);" 
             class="px-2  openEditModal" 
             data-id="${details.id}"
             data-name="${details.name}"
             data-price="${details.price}"
             data-status="${details.status}"
             data-discount="${details.Discount}"
             data-image="${details.image}"
             data-description="${details.Description}">
             <img src="assets/img/icons/edit.svg" alt="img">
          </a>
        </li>
                                            <li class="list-inline-item">
          <a href="javascript:void(0);" 
             class="px-2 openDeleteModal" 
             data-id="${details.id}" id="confirm-color">
             <i class="bx bx-trash-alt font-size-18"></i>
               <img src="assets/img/icons/delete.svg" alt="img">
          </a>
        </li>

                                        </ul>
                                    </td>
                                </tr>
              `)
            
            }
            )
              // Entry Info Text
  const start = (response.data.current_page - 1) * response.data.per_page + 1;
  const end = Math.min(response.data.total, response.data.current_page * response.data.per_page);
  const total = response.data.total;
$('#total_list').text(`( ${total} ) Records`)
  $('#entry-info').text(`Showing ${start} to ${end} of ${total} entries`);

            renderPagination(response.data);
              console.log(response.data);
            },
            error:function(error){

            }
           
          })
    


 $(document).on("click","#confirm-color", function () {
         
    let Id=$(this).data("id");
    //console.log(CategoryId)
     Swal.fire({ 
        title: "Are you sure?",
         text: "You won't be able to revert this!",
         type: "warning", 
         showCancelButton: !0,
          confirmButtonColor: "#3085d6",
           cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
             confirmButtonClass: "btn btn-primary delete_btn", 
             cancelButtonClass: "btn btn-danger ml-1 cancel", 
             buttonsStyling: !1 }).then((result)=> {
            if (result.isConfirmed){
              deleteCategory(Id);
            }
            else if (result.dismiss === Swal.DismissReason.cancel){
                Swal.fire({
                 title: "Cancelled", 
                text: "Your imaginary file is safe :)",confirmButtonClass:
                 "btn btn-success" 
                }) 
            }
    
        }) ;
        }) ;  
    
      
         function deleteCategory(Id){
        $.ajax({
            method:'DELETE',
            url:'http://localhost:8000/api/products/' + Id,
            dataType:'json',
            success:function(response){
                let successMessage=response.message
                Swal.fire({
                 title: "Deleted", 
                text: successMessage
                ,confirmButtonClass: "btn btn-success" 
                }).then(() => {
        // Reload the page after user closes the alert
        location.reload();
    });
                $("#row-" + CategoryId).remove();

            },
            error:function(error){
                let errorMessage=error.responseJSON.message
                Swal.fire({
                 title: "Error", 
                text: errorMessage
                ,confirmButtonClass: "btn btn-danger" 
                }) 

            }
})
    }




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
    formData.append('_method', 'PUT'); // Laravel needs this for PUT via FormData
    formData.append('name', $('#edit_name').val());
    formData.append('price', $('#edit_price').val());
    formData.append('Discount', $('#edit_Discount').val());
    formData.append('status', $('#edit_status').val());
    formData.append('Description', $('#edit_Description').val());
    
    // Append file if selected
    if ($('#edit_image')[0].files[0]) {
        formData.append('image', $('#edit_image')[0].files[0]);
    }

    // Add CSRF token (if using web middleware)
    formData.append('_token', $('meta[name="csrf-token"]').attr('content'));

    $.ajax({
        method: 'POST', // MUST be POST when using FormData + _method=PUT
        url: `http://localhost:8000/api/products/${id}`,
        data: formData,
        processData: false, // Required for FormData
        contentType: false, // Let jQuery set Content-Type automatically
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
    })
 