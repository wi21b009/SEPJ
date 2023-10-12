<?php
if (session_status() == PHP_SESSION_NONE) {
  session_start();
}
?>


<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="/TecShop/index.php">TecShop</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <?php
        if (isset($_SESSION['userID']) && isset($_SESSION['Email'])) {
          // Benutzer ist angemeldet, zeige entsprechende Menüeinträge
          echo '<li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/TecShop/Frontend/sites/edit_profile.php">Mein Konto</a>
                </li>';
          echo '<li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/TecShop/Frontend/sites/orders_show.php">Meine Bestellungen</a>
              </li>';
          echo '<li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/TecShop/Backend/logic/logout.php">Logout</a>
                </li>';    
        } else {
          // Benutzer ist nicht angemeldet, zeige eingeschränkte Menüeinträge
          echo '<li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/TecShop/Frontend/sites/login.php">Login</a>
                </li>';
          echo '<li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Neu hier?
                  </a>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="/TecShop/Frontend/sites/register.php">Registrieren</a></li>
                    <li>
                      <hr class="dropdown-divider">
                    </li>
                    <li><a class="dropdown-item" href="/TecShop/Frontend/sites/login.php">Bereits registriert?</a></li>
                  </ul>
                </li>';
        }
        ?>

        <?php
        if (isset($_SESSION['role']) && $_SESSION['role'] == 'admin') {
          // Nur für Admins sichtbar: Menüeintrag "Admin-Bereich"
          echo '<li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Admin-Bereich
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="/TecShop/Frontend/sites/product_admin.php">Produktverwaltung</a></li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li><a class="dropdown-item" href="/TecShop/Frontend/sites/edit_users.php">Kunden bearbeiten</a></li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li><a class="dropdown-item" href="/TecShop/Frontend/sites/coupon_admin.php">Gutscheine verwalten</a></li>
          </ul>
        </li>';
        }
        ?>

      </ul>
      <form class="d-flex" action="/TecShop/index.php" method="GET" id="searchForm">
  <input class="form-control me-2" name="search" type="search" placeholder="Produkte, ..." aria-label="Search" id="searchInput">
  <button class="btn btn-outline-success" type="submit">Suchen</button>
</form>
      <!-- Cart icon -->
      <ul class="navbar-nav ms-2">
        <li class="nav-item" id="basketContainer">
        <a id="cartIcon" class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#cartModal">
          <img src="/TecShop/Frontend/res/img/cart.png" alt="Cart Icon" class="cart-icon" style="height: 24px">
          <span id="cartItemCount" class="cart-item-count"></span>
        </a>
        </li>
      </ul>
    </div>
  </div>
</nav>