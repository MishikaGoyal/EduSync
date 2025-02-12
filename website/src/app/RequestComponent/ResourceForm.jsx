import React, { useEffect, useState, useCallback, useMemo } from "react";
import { PlusCircle, AlertCircle } from "lucide-react";
import debounce from "lodash.debounce";
import { RESOURCE_TYPES } from "../utils/resourceType";
import { validateQuantity } from "../utils/validation";

export default function ResourceForm({ onRequestCreated }) {
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [udiseId, setUdiseId] = useState(null);
  const [schoolName, setSchoolName] = useState("");

  useEffect(() => {
    const id = sessionStorage.getItem("udiseId");
    if (!id) return;
    setUdiseId(id);

    fetch(`/api/resource-request/principal/get-name?udise_code=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.School_Name) setSchoolName(data.School_Name);
      })
      .catch((err) => console.error("Error fetching school name:", err));
  }, []);

  const debouncedValidation = useMemo(
    () =>
      debounce((inputValue) => {
        const validation = validateQuantity(type, inputValue);
        setQuantityError(validation.isValid ? "" : validation.error);
      }, 300),
    [type]
  );

  useEffect(() => {
    return () => debouncedValidation.cancel();
  }, [debouncedValidation]);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
    if (type) debouncedValidation(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
    if (quantity) {
      const validation = validateQuantity(e.target.value, quantity);
      setQuantityError(validation.isValid ? "" : validation.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!udiseId || !schoolName || !type || quantityError) return;

    const validation = validateQuantity(type, quantity);
    if (!validation.isValid) {
      setQuantityError(validation.error);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/resource-request/principal/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          UDISE_CODE: udiseId,
          School_Name: schoolName,
          resource_type: type,
          quantity: parseInt(quantity, 10),
          description,
          adminId: "admin_1",
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        onRequestCreated(responseData);
        setType("");
        setQuantity("");
        setDescription("");
        setQuantityError("");
      }
    } catch (error) {
      console.error("Failed to create request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2 className="text-2xl font-semibold mb-8 pb-4 border-b border-gray-100">
        New Resource Request
      </h2>
      <div className="space-y-6">
        <div>
          <label className="form-label">Resource Type</label>
          <select
            value={type}
            onChange={handleTypeChange}
            className="form-input"
            required
            disabled={isSubmitting}
          >
            <option value="">Select a resource type</option>
            {RESOURCE_TYPES.map((resource) => (
              <option key={resource.label} value={resource.label}>
                {resource.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="form-label">Quantity</label>
          <input
            type="text"
            value={quantity}
            onChange={handleQuantityChange}
            className={`form-input ${
              quantityError ? "border-red-300 focus:ring-red-500" : ""
            }`}
            required
            disabled={isSubmitting}
            placeholder={
              type
                ? `Enter quantity in ${
                    RESOURCE_TYPES.find((r) => r.label === type)?.unit ||
                    "units"
                  }`
                : "Select a resource type first"
            }
          />
          {quantityError && (
            <div className="mt-2 flex items-center text-sm text-red-600">
              <AlertCircle className="w-4 h-4 mr-1" />
              {quantityError}
            </div>
          )}
        </div>
        <div>
          <label className="form-label">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-input min-h-[120px] resize-none"
            required
            disabled={isSubmitting}
            placeholder="Provide additional details about your request..."
          />
        </div>
        <button
          type="submit"
          className="btn-primary mt-8"
          disabled={isSubmitting || !!quantityError}
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </button>
      </div>
    </form>
  );
}
