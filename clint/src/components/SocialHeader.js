import React from "react";

function SocialHeader() {
  return (
    
      <div class="col d-lg-none ">
        <div class="ec-header-bottons">
          <div class="ec-header-user dropdown">
            <button class="dropdown-toggle" data-bs-toggle="dropdown">
              <i class="fi-rr-user"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-right">
              <li>
                <a class="dropdown-item" href="register.html">
                  Register
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="checkout.html">
                  Checkout
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="login.html">
                  Login
                </a>
              </li>
            </ul>
          </div>

          <a href="wishlist.html" class="ec-header-btn ec-header-wishlist">
            <div class="header-icon">
              <i class="fi-rr-heart"></i>
            </div>
            <span class="ec-header-count">4</span>
          </a>

          <a href="#ec-side-cart" class="ec-header-btn ec-side-toggle">
            <div class="header-icon">
              <i class="fi-rr-shopping-bag"></i>
            </div>
            <span class="ec-header-count cart-count-lable">3</span>
          </a>

          <a
            href="#ec-mobile-menu"
            class="ec-header-btn ec-side-toggle d-lg-none"
          >
            <i class="fi fi-rr-menu-burger"></i>
          </a>
        </div>
      </div>
    
  );
}

export default SocialHeader;
