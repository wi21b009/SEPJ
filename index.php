<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Homepage</title>
</head>
<body>
     <!-- Navbar -->
     <?php
        include 'Frontend/sites/navbar.php';
        ?>
     <br>
     <br>
     <h2 style="text-align: center">CarCrawl</h2>
 
     <br>
     <br>
     <h3 style="text-align: center">Unsere Produkte:</h3>
 
     <div class="container" id="categoryContainer" style="max-width: 500px;">
         <select class="form-select" id="categoryDropdown" style="max-width: 500px;"></select>
     </div>
     
     <div class="container" id="cardContainer" style="max-width: 1500px;"></div>
     <br>
     
 
     <!-- Product Listing -->
     <div id="productContainer">
         <!-- Product Cards -->
     </div>
 
     <!-- Bootstrap -->
     <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
         integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe"
         crossorigin="anonymous"></script>
     <!-- jQuery -->
     <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
     <script src="https://code.jquery.com/ui/1.13.1/jquery-ui.min.js"></script>
 
     <!-- custom Javascript -->
     <script src="Frontend/js/display_products.js"></script>
     <script src="Frontend/js/basket.js"></script>
     <script src="Frontend/js/rememberme.js"></script>
 </body>
</body>
</html>