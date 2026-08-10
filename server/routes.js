<Routes>

  <Route path="/" element={<Home />} />

  <Route path="/book" element={<App />} />

  <Route
    path="/customer-login"
    element={<CustomerLogin />}
  />

  <Route
    path="/customer-register"
    element={<CustomerRegister />}
  />

  <Route
    path="/business-login"
    element={<BusinessLogin />}
  />

  <Route
    path="/business-register"
    element={<BusinessRegister />}
  />

  <Route
    path="/customer-dashboard"
    element={<CustomerDashboard />}
  />

  <Route
    path="/business-dashboard"
    element={<BusinessDashboard />}
  />

  <Route
    path="/admin"
    element={<AdminDashboard />}
  />

  <Route
    path="/payment-success"
    element={<PaymentSuccess />}
  />

  <Route
    path="/payment-cancel"
    element={<PaymentCancel />}
  />

</Routes>