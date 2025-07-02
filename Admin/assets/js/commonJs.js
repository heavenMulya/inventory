/** =========================
 * 📦 CRUD Utility Toolkit
 * =========================
 * - dynamicGet(): Fetch & render data with pagination
 * - handleCreate(): POST new record
 * - handleEditModalOpen(): Auto-fill edit form
 * - handleEditSubmit(): PUT/UPDATE record
 * - handleDelete(): DELETE record with SweetAlert
 * 
 * Author: heaven lyamuya ✨
 * =========================
 */

/** 📥 Fetch + Render Table Data */

$(document).ready(function () {

    // 📥 Collect all input values from a modal or container using [name] attributes
function collectFormDataFromContainer(containerSelector) {
  const formData = new FormData();
  const container = $(containerSelector);

  container.find('[name]').each(function () {
    const input = $(this);
    const name = input.attr('name');
    const type = input.attr('type');

    if (type === 'file') {
      const file = input[0].files[0];
      if (file) {
        formData.append(name, file); // Use new image
      } else {
        // No new image, use existing image path
        const existingImage = container.find('[name="existing_image"]').val();
        if (existingImage) {
          formData.append('image', existingImage); // Same name Laravel expects
        }
      }
    } else if (name !== 'existing_image') {
      formData.append(name, input.val());
    }

    
  });
for (let pair of formData.entries()) {
  console.log(`${pair[0]}:`, pair[1]);
}

  return formData;
}


  dynamicGet({
    url: 'http://localhost:8000/api/products',
    renderRow: details => `
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
                                </tr>`
  });

 handleCreate({
  buttonSelector: '#save',
  containerSelector: '#add', // this is your modal id
  url: 'http://localhost:8000/api/products'
});


handleEditModalOpen({

  triggerSelector: '.openEditModal',
  containerSelector: '#edit',     // whole modal or section containing named fields
  modalId: 'edit'

});

handleEditSubmit({
  buttonSelector: '#edit_btn',
  containerSelector: '#edit',
  idFieldName: 'id',              // hidden field <input type="hidden" name="id">
  urlPrefix: 'http://localhost:8000/api/products'

});

  handleDelete({
    triggerSelector: '.openDeleteModal',
    urlPrefix: 'http://localhost:8000/api/products'
  });



function dynamicGet({
    url,
    renderRow,
    tableBodySelector = '#table_body',
    pagination = true,
    totalSelector = '#total_list',
    entryInfoSelector = '#entry-info',
    onSuccess = null,
    onError = null
}) {
    $.ajax({
        method: 'GET',
        url: url,
        dataType: 'json',
        success: function (response) {
            const tbody = $(tableBodySelector).empty();
            response.data.data.forEach(item => tbody.append(renderRow(item)));

            if (pagination) {
                const { current_page, per_page, total } = response.data;
                const start = (current_page - 1) * per_page + 1;
                const end = Math.min(total, current_page * per_page);

                $(totalSelector).text(`( ${total} ) Records`);
                $(entryInfoSelector).text(`Showing ${start} to ${end} of ${total} entries`);

                if (typeof renderPagination === 'function') {
                    renderPagination(response.data);
                }
            }

            if (typeof onSuccess === 'function') onSuccess(response);
        },
        error: function (error) {
            if (typeof onError === 'function') onError(error);
            else console.error('Fetch error:', error);
        }
    });
}

/** 🆕 Create New Record (POST) */
function handleCreate({
  buttonSelector = '#save',
  containerSelector = '#add', // <--- modal ID here
  url,
  modalSelector = '#add',
  successAlertSelector = '#success-alert',
  errorAlertSelector = '#error-alert',
  successMessageSelector = '#success-message',
  errorMessageSelector = '#error-message'

 
}) {
  $(document).on('click', buttonSelector, function (e) {
    e.preventDefault();

    const formData = collectFormDataFromContainer(containerSelector);
    $.ajax({
      method:'POST',
      url,
      data:formData,
      processData: false,
      contentType: false,
      success: function (response) {
        $(successMessageSelector).text(response.message);
        $(successAlertSelector).show();
        setTimeout(() => $(successAlertSelector).hide(), 3000);
        $(modalSelector).modal('hide');
        window.location.reload();
      },
      error: function (error) {
        const msg = error.responseJSON?.message || error.responseText || 'Something went wrong';
        $(errorMessageSelector).text(msg);
        $(errorAlertSelector).show();
        setTimeout(() => $(errorAlertSelector).hide(), 3000);
        $(modalSelector).modal('hide');
      }
    });
  });
}


/** ✏️ Fill Edit Form with Data */
function handleEditModalOpen({
  triggerSelector,
  containerSelector, // instead of 'formSelector', to support any layout
  modalId
}) {
  $(document).on('click', triggerSelector, function () {
    const data = $(this).data();
    const container = $(containerSelector);

    Object.keys(data).forEach(key => {
      const element = container.find(`[name="${key}"]`);
      if (element.length) {
        if (element.attr('type') === 'file') return;
        if (element.is('img')) {
          element.attr('src', data[key]).show();
        } else {
          element.val(data[key]);
        }
      }
    });
     if (data.image) {
            const imgPreview = container.find('#edit_image_preview');
            imgPreview.attr('src', data.image);
            imgPreview.show();
        } else {
            // Hide preview if no image
            form.find('#edit_image_preview').hide();
        }

        if (data.image) {
    const imgPreview = container.find('#edit_image_preview');
    imgPreview.attr('src', data.image).show();

    // Set the value of hidden input
    container.find('#edit_existing_image').val(data.image);
} else {
    container.find('#edit_image_preview').hide();
    container.find('#edit_existing_image').val('');
}
    const modal = new bootstrap.Modal(document.getElementById(modalId));
    modal.show();
  });
}


/** 💾 Submit Edited Data (PUT) */
// 🚀 Enhanced Dynamic Form Handler
function handleEditSubmit({
  buttonSelector,
  containerSelector,
  idFieldName = 'id',
  urlPrefix,
  modalSelector = '#edit'
}) {
  $(document).on('click', buttonSelector, function(e) {
    e.preventDefault();

    // 1. Get form data with proper file handling
    const formData = new FormData();
    const container = $(containerSelector);
    
    // Append all fields except files
    container.find('[name]:not([type="file"])').each(function() {
      if ($(this).attr('name') !== idFieldName) {
        formData.append($(this).attr('name'), $(this).val());
      }
    });

    // Handle file uploads
    container.find('input[type="file"]').each(function() {
      if (this.files[0]) {
        formData.append($(this).attr('name'), this.files[0]);
      }
    });

    // For Laravel's method spoofing
    formData.append('_method', 'PUT');

    // 2. Debug output
    console.group('FormData Contents');
    for (let [key, value] of formData.entries()) {
      console.log(key + ':', value instanceof File ? value.name : value);
    }
    console.groupEnd();

    // 3. Make the AJAX call
    $.ajax({
      url: `${urlPrefix}/${container.find(`[name="${idFieldName}"]`).val()}`,
      type: 'POST', // Required for FormData
      data: formData,
      processData: false, // Crucial for files
      contentType: false, // Let browser set boundar
       headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json'
        },
      success: function(response) {
        showSuccess(response.message);
        $(modalSelector).modal('hide');
        setTimeout(() => window.location.reload(), 1000);
      },
      error: function(xhr) {
        let errorMsg = 'Error updating record';
        if (xhr.responseJSON && xhr.responseJSON.message) {
          errorMsg = xhr.responseJSON.message;
        } else if (xhr.status === 302) {
          errorMsg = 'Unexpected redirect occurred';
        }
        showError(errorMsg);
      }
    });
  });
}

// Helper functions
function showSuccess(msg) {
  $('#success-message').text(msg);
  $('#success-alert').show().delay(3000).fadeOut();
}

function showError(msg) {
  $('#error-message').text(msg);
  $('#error-alert').show().delay(3000).fadeOut();
}

// 🔍 Helper function to show alerts
function showAlert(alertSelector, messageSelector, message) {
  $(messageSelector).text(message);
  $(alertSelector).show().delay(3000).fadeOut();
}

/** ❌ Delete Record with Confirmation */
function handleDelete({
    triggerSelector,
    urlPrefix,
    rowPrefix = "row-",
    reload = true
}) {
    $(document).on('click', triggerSelector, function () {
        const id = $(this).data('id');

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(result => {
            if (result.isConfirmed) {
                $.ajax({
                    method: 'DELETE',
                    url: `${urlPrefix}/${id}`,
                    dataType: 'json',
                    success: function (response) {
                        Swal.fire({
                            title: "Deleted!",
                            text: response.message,
                            icon: "success"
                        }).then(() => {
                            if (reload) {
                                location.reload();
                            } else {
                                $(`#${rowPrefix}${id}`).remove();
                            }
                        });
                    },
                    error: function (error) {
                        const msg = error.responseJSON?.message || "Something went wrong";
                        Swal.fire({ title: "Error!", text: msg, icon: "error" });
                    }
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: "Cancelled",
                    text: "Your data is safe 🙂",
                    icon: "info"
                });
            }
        });
    });
}
});