$(document).ready(function () {
  function updateTotal() {
    var total = 0;
    $(".item-total").each(function () {
      var val = parseFloat($(this).text().substring(1));
      if (!isNaN(val)) {
        total += val;
      }
    });
    $(".total").text("Total Price: $" + total.toFixed(2));
  }
  $(document).on("click", ".add-btn", function () {
    var row = $(this).closest("tr");
    var quantityCell = row.find("td:eq(2)");
    var quantity = parseInt(quantityCell.text(), 10);
    quantity++;
    quantityCell.text(quantity);

    var price = parseFloat(row.find("td:eq(1)").text().substring(1));
    var itemTotalCell = row.find("td:eq(3)");
    var itemTotal = (quantity * price).toFixed(2);
    itemTotalCell.text("$" + itemTotal);

    updateTotal();
  });

  $(document).on("click", ".remove-btn", function () {
    var row = $(this).closest("tr");
    var quantityCell = row.find("td:eq(2)");
    var quantity = parseInt(quantityCell.text(), 10);

    if (quantity > 1) {
      quantity--;
      quantityCell.text(quantity);

      var price = parseFloat(row.find("td:eq(1)").text().substring(1));
      var itemTotalCell = row.find("td:eq(3)");
      var itemTotal = (quantity * price).toFixed(2);
      itemTotalCell.text("$" + itemTotal);
    } else if (quantity === 1 || quantity === 0) {
      row.remove();
    }

    updateTotal();
  });

  $(document).on("click", "#add-new-item", function () {
    const newItem = $("#new-item").val();
    const newPrice = $("#new-price").val();
    const newQuantity = $("#new-quantity").val();
    const newRow = `
      <tr>
        <td>${newItem}</td>
        <td>$${newPrice}</td>
        <td>${newQuantity}</td>
        <td class="item-total">$${(newPrice * newQuantity).toFixed(2)}</td>
        <td><button class="add-btn">add</button></td>
        <td><button class="remove-btn">remove</button></td>
      </tr>
    `;

    $("tbody").append(newRow);
    updateTotal();
    $('#new-item').val('');
    $('#new-price').val('');
    $('#new-quantity').val('');
  });
});
