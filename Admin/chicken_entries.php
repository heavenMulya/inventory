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
<h4>Product List</h4>
<h6>Manage your products</h6>
</div>
<div class="page-btn">
<a href="#" data-bs-toggle="modal" data-bs-target="#add" class="btn btn-added"><img src="assets/img/icons/plus.svg" alt="img" class="me-1">ad New Product</a>
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
<th>Product Name</th>
<th>price</th>
<th>Created By</th>
<th>Action</th>
</tr>
</thead>
<tbody id='table_body'>
<tr>

<td class="productimgname">
<a href="javascript:void(0);" class="product-img">
<img src="assets/img/product/product1.jpg" alt="product">
</a>
<a href="javascript:void(0);">Macbook pro</a>
</td>
<td>100.00</td>
<td>Admin</td>
<td>
<a class="me-3" href="product-details.html">
<img src="assets/img/icons/eye.svg" alt="img">
</a>
<a class="me-3" href="editproduct.html">
<img src="assets/img/icons/edit.svg" alt="img">
</a>
<a class="confirm-text" href="javascript:void(0);">
<img src="assets/img/icons/delete.svg" alt="img">
</a>
</td>
</tr>


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
        <h5 class="modal-title" id="editLabel">Product Edit</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style="background-color: white;"></button>
      </div>

      <div class="modal-body">
        <div class="card">
          <div class="card-body">
            <div class="row">

              <input type="hidden" id="edit_id" name="id">

              <div class="col-12">
                <div class="form-group">
                  <label>Product Name</label>
                  <input type="text" id="edit_name" name="name">
                </div>
              </div>

              <div class="col-12">
                <div class="form-group">
                  <label>Description</label>
                  <textarea class="form-control" id="edit_description" name="description"></textarea>
                </div>
              </div>

              <div class="col-12">
                <div class="form-group">
                  <label>Product Price</label>
                  <input type="text" id="edit_price" name="price">
                </div>
              </div>

              <div class="col-12">
                <div class="form-group mb-3">
                  <label for="discountType" class="form-label">Discount Type</label>
                  <select id="edit_discount" name="discount" class="form-select">
                    <option selected disabled>Select a discount</option>
                    <option value="">Percentage</option>
                    <option value="10">10%</option>
                    <option value="20">20%</option>
                  </select>
                </div>
              </div>

              <div class="col-12">
                <div class="form-group mb-3">
                  <label>Status</label>
                  <select id="edit_status" name="status" class="form-select">
                    <option value="Available">Available</option>
                    <option value="Out Of Stock">Out Of Stock</option>
                  </select>
                </div>
              </div>

              <div class="col-12">
                <div class="form-group">
                  <label>Product Image</label>
                  <div class="image-upload">
                    <input type="file" id="edit_image" name="image">
                    <div class="image-preview mb-2">
                      <img id="edit_image_preview"  src="" alt="Current Image" width="80" style="display: none;">
                    <input type="hidden" name="existing_image" id="edit_existing_image">

                    </div>
                    <div class="image-uploads">
                      <img src="assets/img/icons/upload.svg" alt="img">
                      <h4>Drag and drop a file to upload</h4>
                    </div>
                  </div>
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
<div class="modal fade" id="add" tabindex="-1" aria-labelledby="addLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      
      <div class="modal-header" style=" color:#ff9f43;">
        <h5 class="modal-title" id="addLabel">Product add</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style="background-color: white;"></button>
      </div>

      <div class="modal-body">
      <div class="card">

<div class="card-body">
<div class="row">

<div class="col-12">
<div class="form-group">
<label>Product Name</label>
<input type="text" id="name" name="name">
</div>
</div>

<div class="col-12">
<div class="form-group">
<label>Description</label>
<textarea class="form-control" id="description" name="description"></textarea>
</div>
</div>

<div class="col-12">
<div class="form-group">
<label>Product Price</label>
<input type="text" id="price" name="price">
</div>
</div>

<div class="col-12">
  <div class="form-group mb-3">
    <label for="discountType" class="form-label">Discount Type</label>
    <select id="discount" name="discount"  class="form-select">
      <option selected disabled >Select a discount</option>
      <option value="">Percentage</option>
      <option value="10">10%</option>
      <option value="20">20%</option>
    </select>
  </div>
</div>



<div class="col-12">
<div class="form-group mb-3">
<label> Status</label>
<select id="status" name="status" class="form-select">
<option value="Available">Available</option>
<option value="Out Of Stock">Out Of Stock</option>
</select>
</div>
</div>

<div class="col-12">
<div class="form-group">
<label> Product Image</label>
<div class="image-upload">
<input type="file" id="image" name="image">
<div class="image-uploads">
<img src="assets/img/icons/upload.svg" alt="img">
<h4>Drag and drop a file to upload</h4>
</div>
</div>
</div>
</div>


</div>
</div>


      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" form="add" class="btn" style="background-color: #ff9f43; color: white;" id="save">Save</button>
      </div>
      
    </div>
  </div>

</div>
</div>
</div>


  





</body>
</html>


