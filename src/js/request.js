function request(e) {
    event.preventDefault();
    var productOrder = document.getElementById("productOrder").value;
    var requesterName = document.getElementById("requesterName").value;
    var requesterTell = document.getElementById("requesterTell").value;
    var requesterEmail = document.getElementById("requesterEmail").value;
    var userRequest = {
        productOrder: productOrder,
        requesterName: requesterName,
        requesterTell: requesterTell,
        requesterEmail: requesterEmail,
    };
    var order = JSON.stringify(userRequest);
    localStorage.setItem(productOrder, order);
    alert("Yêu cầu may đo của bạn đã được tiếp nhận")
}