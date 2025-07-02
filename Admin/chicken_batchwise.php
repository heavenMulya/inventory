<?php include 'navigation_bar.php' ?>
<?php include 'sidebar.php' ?>



<div class="page-wrapper">
    <div class="alert alert-success alert-dismissible fade show" role="alert" style="display: none;" id="success-alert">
        <strong>Success</strong> <p id="success-message">You should check in on some of those fields below.</p> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <div class="alert alert-danger alert-dismissible fade show" role="alert" style="display: none;" id="error-alert">
            <strong>Error</strong><p id="error-message">You should check in on some of those fields below.</p> 
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
<div class="content">
<div class="page-header">
<div class="page-title">
<h4>Chickens Batchwise List</h4>
<h6>Manage your Chickens</h6>
</div>
<div class="page-btn">
<a href="#" data-bs-toggle="modal" data-bs-target="#addchicken" class="btn btn-added"><img src="assets/img/icons/plus.svg" alt="img" class="me-1">Add New Batch</a>
</div>
</div>

<div class="card">
<div class="card-body">
<div class="table-top">
<div class="search-set">
<div class="search-path">

</div>


<div class="search-input">
<a class="btn btn-searchset"><img src="assets/img/icons/search-white.svg" alt="img"></a>
</div>


</div>
<div class="wordset">
<ul>
<li>
<a data-bs-toggle="tooltip" data-bs-placement="top" title="pdf"><img src="assets/img/icons/pdf.svg" alt="img"></a>
</li>
<li>
<a data-bs-toggle="tooltip" data-bs-placement="top" title="excel"><img src="assets/img/icons/excel.svg" alt="img"></a>
</li>
<li>
<a data-bs-toggle="tooltip" data-bs-placement="top" title="print"><img src="assets/img/icons/printer.svg" alt="img"></a>
</li>
</ul>
</div>
</div>



<div class="table-responsive">
<table class="table table-bordered">
<thead>
<tr>
<th>Arrival Date</th>
<th>Batch Name</th>
<th>Quantity</th>
<th>Action</th>
</tr>
</thead>
<tbody id='chiken_table_body'>
</tbody>
</table>
</div>
</div>
</div>

</div>
</div>
</div>


<!-- Edit Product Modal -->

<!-- Edit Modal -->
<div class="modal" id="edit" tabindex="-1" aria-labelledby="editLabel" aria-hidden="true">

  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">

      <div class="modal-header" style="color:#ff9f43;">
        <h5 class="modal-title" id="editLabel">Chikens Edit</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style="background-color: white;"></button>
      </div>

      <div class="modal-body">
        <div class="card">
          <div class="card-body">
            <div class="row">

              <input type="hidden" id="edit_id" name="id">

              <div class="col-12">
                <div class="form-group">
                  <label>Batch Name</label>
                  <input type="text" id="edit_name" name="name" disabled>
                </div>
              </div>

              <div class="col-12">
                <div class="form-group">
                  <label>Arrival Date</label>
                  <textarea class="form-control" id="edit_description" name="description" disabled></textarea>
                </div>
              </div>

              <div class="col-12">
                <div class="form-group">
                  <label>Quantity/label>
                  <input type="text" id="quantity" name="quantity">
                </div>
              </div>

            </div> <!-- CLOSE .row -->
          </div> <!-- CLOSE .card-body -->
        </div> <!-- CLOSE .card -->
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" form="edit" class="btn" style="background-color: #ff9f43; color: white;" id="edit_btn">Edit</button>
      </div>

    </div> <!-- CLOSE .modal-content -->
  </div> <!-- CLOSE .modal-dialog -->
</div> <!-- CLOSE .modal -->






        <!-- add payment Modal -->
<div class="modal fade" id="addchicken" tabindex="-1" aria-labelledby="addchickenLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      
      <div class="modal-header" style=" color:#ff9f43;">
        <h5 class="modal-title" id="addchickenLabel">Chickens add</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style="background-color: white;"></button>
      </div>

      <div class="modal-body">
      <div class="card">

<div class="card-body">
<div class="row">

<div class="col-12">
<div class="form-group">
<label>arrival_date</label>
<input type="date" id="arrival_date" name="arrival_date">
</div>
</div>

<div class="col-12">
<div class="form-group">
<label>Quantity</label>
<input type="text" class="form-control" id="quantity" name="quantity"/>
</div>
</div>


</div>
</div>


      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" form="add" class="btn" style="background-color: #ff9f43; color: white;" id="save_chicken">Save</button>
      </div>
      
    </div>
  </div>

</div>
</div>
</div>

<script>

        $(document).ready(function(){

            function getInputData(modalId)
            {
      const formData = new FormData();
    // Find all input, select, and textarea elements within the modal
    $(modalId).find('input, select, textarea').each(function() {
        const input = $(this);
        const name = input.attr('name');
        const value = input.val();
        
        // For file inputs, get the actual file
        if (input.attr('type') === 'file') {
            const file = input[0].files[0];
            if (file) {
                formData.append(name, file);
            }
        } 
        // For other input types
        else if (name && value !== undefined) {
            formData.append(name, value);
        }
    });

    return formData;
            }

            
function saveData(btnId,url,modelId)

{  
$(btnId).click(function(e) {
    e.preventDefault();

 const formData = getInputData(modelId);
    $.ajax({
        method: 'POST',
        url:url ,
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

}

function getData(url,tbodyId,callback){
 $.ajax({
            method:'GET',
            url:url,
            dataType:'json',
              success:function(response){
             callback(resposne)
             
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
        }
   
          
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
            url:'http://localhost:8000/api/chickens/' + Id,
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
                let errorMessage=error
                Swal.fire({
                 title: "Error", 
                text: errorMessage
                ,confirmButtonClass: "btn btn-danger" 
                }) 

            }
})
    }





saveData(
    '#save_chicken',
    'http://localhost:8000/api/chickens',
    '#addchicken'
)

getData(
    `http://localhost:8000/api/chickens?page=1`,
    '#chiken_table_body'   
)

});

</script>
  





</body>
</html>


