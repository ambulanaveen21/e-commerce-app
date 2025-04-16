<template>
  <footer class="footer">
    <div class="footer-content">
      <p>&copy; 2024 My Ecommerce Store</p>
      <nav>
        <ul>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/privacy-policy">Privacy Policy</a></li>
          <li><a href="/terms">Terms of Service</a></li>
        </ul>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #2f2f2f;
  color: #fff;
  text-align: center;
  padding: 12px 20px;
  font-size: 14px;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.footer ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}

.footer a {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.footer a:hover {
  color: #ff5733;
  text-decoration: underline;
}

@media (max-width: 600px) {
  .footer-content {
    font-size: 13px;
  }

  .footer ul {
    gap: 10px;
    flex-direction: column;
  }
}
</style>
