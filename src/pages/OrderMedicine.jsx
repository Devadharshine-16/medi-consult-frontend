import { useState } from "react";

function OrderMedicine() {
  const [formData, setFormData] = useState({
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    prescriptionImage: null,
    medicineName: "",
    dosage: "",
    quantity: "",
    frequency: "",
    duration: "",
    doctorName: "",
    doctorLicense: "",
    deliveryAddress: "",
    deliveryCity: "",
    deliveryState: "",
    deliveryPincode: "",
    deliveryInstructions: "",
    paymentMethod: "online",
    emergencyContact: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitMessage("Medicine order submitted successfully! You will receive a confirmation email shortly.");
      setIsSubmitting(false);
      // Reset form
      setFormData({
        patientName: "",
        patientEmail: "",
        patientPhone: "",
        prescriptionImage: null,
        medicineName: "",
        dosage: "",
        quantity: "",
        frequency: "",
        duration: "",
        doctorName: "",
        doctorLicense: "",
        deliveryAddress: "",
        deliveryCity: "",
        deliveryState: "",
        deliveryPincode: "",
        deliveryInstructions: "",
        paymentMethod: "online",
        emergencyContact: ""
      });
    }, 2000);
  };

  return (
    <div className="container">
      <div className="order-medicine-container">
        <div className="order-medicine-header">
          <h1>💊 Order Medicine</h1>
          <p>Upload your prescription and get your medicines delivered to your doorstep</p>
        </div>

        <div className="order-medicine-card">
          <form onSubmit={handleSubmit} className="order-medicine-form">
            
            {/* Patient Information Section */}
            <div className="form-section">
              <h3>👤 Patient Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="patientName">Full Name *</label>
                  <input
                    type="text"
                    id="patientName"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    className="form-input"
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="patientEmail">Email Address *</label>
                  <input
                    type="email"
                    id="patientEmail"
                    name="patientEmail"
                    value={formData.patientEmail}
                    onChange={handleChange}
                    className="form-input"
                    required
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="patientPhone">Phone Number *</label>
                  <input
                    type="tel"
                    id="patientPhone"
                    name="patientPhone"
                    value={formData.patientPhone}
                    onChange={handleChange}
                    className="form-input"
                    required
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="emergencyContact">Emergency Contact</label>
                  <input
                    type="tel"
                    id="emergencyContact"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Emergency contact number"
                  />
                </div>
              </div>
            </div>

            {/* Prescription Upload Section */}
            <div className="form-section">
              <h3>📄 Prescription Upload</h3>
              <div className="form-group">
                <label htmlFor="prescriptionImage">Upload Prescription *</label>
                <input
                  type="file"
                  id="prescriptionImage"
                  name="prescriptionImage"
                  onChange={handleChange}
                  className="form-input file-input"
                  accept="image/*,.pdf"
                  required
                />
                <small className="file-help">Upload clear image or PDF of your prescription (Max 5MB)</small>
              </div>
            </div>

            {/* Medicine Details Section */}
            <div className="form-section">
              <h3>💊 Medicine Details</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="medicineName">Medicine Name *</label>
                  <input
                    type="text"
                    id="medicineName"
                    name="medicineName"
                    value={formData.medicineName}
                    onChange={handleChange}
                    className="form-input"
                    required
                    placeholder="Enter medicine name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dosage">Dosage *</label>
                  <input
                    type="text"
                    id="dosage"
                    name="dosage"
                    value={formData.dosage}
                    onChange={handleChange}
                    className="form-input"
                    required
                    placeholder="e.g., 500mg, 10ml"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="quantity">Quantity *</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="form-input"
                    required
                    min="1"
                    placeholder="Number of units"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="frequency">Frequency *</label>
                  <select
                    id="frequency"
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select frequency</option>
                    <option value="Once daily">Once daily</option>
                    <option value="Twice daily">Twice daily</option>
                    <option value="Three times daily">Three times daily</option>
                    <option value="Four times daily">Four times daily</option>
                    <option value="As needed">As needed</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="duration">Duration *</label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="form-input"
                  required
                  placeholder="e.g., 7 days, 2 weeks, 1 month"
                />
              </div>
            </div>

            {/* Doctor Information Section */}
            <div className="form-section">
              <h3>👨‍⚕️ Doctor Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="doctorName">Doctor Name *</label>
                  <input
                    type="text"
                    id="doctorName"
                    name="doctorName"
                    value={formData.doctorName}
                    onChange={handleChange}
                    className="form-input"
                    required
                    placeholder="Enter doctor's name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="doctorLicense">Doctor License Number</label>
                  <input
                    type="text"
                    id="doctorLicense"
                    name="doctorLicense"
                    value={formData.doctorLicense}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter license number"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Information Section */}
            <div className="form-section">
              <h3>🚚 Delivery Information</h3>
              <div className="form-group">
                <label htmlFor="deliveryAddress">Delivery Address *</label>
                <textarea
                  id="deliveryAddress"
                  name="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={handleChange}
                  className="form-input"
                  required
                  rows="3"
                  placeholder="Enter complete delivery address"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="deliveryCity">City *</label>
                  <input
                    type="text"
                    id="deliveryCity"
                    name="deliveryCity"
                    value={formData.deliveryCity}
                    onChange={handleChange}
                    className="form-input"
                    required
                    placeholder="Enter city"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="deliveryState">State *</label>
                  <input
                    type="text"
                    id="deliveryState"
                    name="deliveryState"
                    value={formData.deliveryState}
                    onChange={handleChange}
                    className="form-input"
                    required
                    placeholder="Enter state"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="deliveryPincode">Pincode *</label>
                  <input
                    type="text"
                    id="deliveryPincode"
                    name="deliveryPincode"
                    value={formData.deliveryPincode}
                    onChange={handleChange}
                    className="form-input"
                    required
                    placeholder="Enter pincode"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="deliveryInstructions">Delivery Instructions</label>
                <textarea
                  id="deliveryInstructions"
                  name="deliveryInstructions"
                  value={formData.deliveryInstructions}
                  onChange={handleChange}
                  className="form-input"
                  rows="2"
                  placeholder="Any special delivery instructions"
                />
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="form-section">
              <h3>💳 Payment Method</h3>
              <div className="form-group">
                <label htmlFor="paymentMethod">Select Payment Method *</label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  <option value="online">Online Payment (Credit/Debit Card)</option>
                  <option value="upi">UPI Payment</option>
                  <option value="cod">Cash on Delivery</option>
                  <option value="wallet">Digital Wallet</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-actions">
              <button
                type="submit"
                className="btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting Order..." : "Submit Medicine Order"}
              </button>
            </div>

            {submitMessage && (
              <div className="message success">
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default OrderMedicine;

