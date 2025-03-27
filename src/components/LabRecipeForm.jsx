import { useState } from 'react'
import toast from 'react-hot-toast'

function LabRecipeForm() {
  const initialFormState = {
    party: '',
    fabricName: '',
    lotNo: '',
    registerNo: '',
    shade: '',
    color1: '',
    percentage1: '',
    color2: '',
    percentage2: '',
    color3: '',
    percentage3: '',
    color4: '',
    percentage4: '',
    remarks: '',
    etd: ''
  }

  const [formData, setFormData] = useState(initialFormState)
  const [errors, setErrors] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  const [activeSection, setActiveSection] = useState('all')

  // Sample data for dropdowns
  const parties = ['Party A', 'Party B', 'Party C', 'Party D']
  const fabrics = ['Cotton', 'Polyester', 'Silk', 'Wool', 'Linen', 'Denim']

  const handleChange = (e) => {
    const { name, value } = e.target
    
    // For percentage fields, validate to 5 decimal places
    if (name.includes('percentage')) {
      const regex = /^\d*\.?\d{0,5}$/
      if (value && !regex.test(value)) return
    }
    
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Check all fields are filled
    Object.keys(formData).forEach(key => {
      if (!formData[key]) {
        newErrors[key] = 'This field is required'
      }
    })
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Simulate saving
      setIsSaving(true)
      
      setTimeout(() => {
        // In a real app, you would send this data to an API
        console.log('Form data submitted:', formData)
        
        // Show success toast
        toast.success('Recipe saved successfully!', {
          icon: '🎉',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        })
        
        // Reset form
        setFormData(initialFormState)
        setIsSaving(false)
      }, 1500)
    } else {
      toast.error('Please fill all required fields', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      })
    }
  }

  const setSection = (section) => {
    setActiveSection(section)
  }

  return (
    <div className="lab-recipe-form-container">
      <div className="form-tabs">
        <button 
          className={`tab-button ${activeSection === 'all' ? 'active' : ''}`} 
          onClick={() => setSection('all')}
        >
          All Fields
        </button>
        <button 
          className={`tab-button ${activeSection === 'basic' ? 'active' : ''}`} 
          onClick={() => setSection('basic')}
        >
          Basic Info
        </button>
        <button 
          className={`tab-button ${activeSection === 'colors' ? 'active' : ''}`} 
          onClick={() => setSection('colors')}
        >
          Colors
        </button>
      </div>
      
      <div className="lab-recipe-form">
        <form onSubmit={handleSubmit}>
          <div className={`form-section ${activeSection === 'all' || activeSection === 'basic' ? 'visible' : ''}`}>
            <h3 className="section-title">Basic Information</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="party">Party <span className="required">*</span></label>
                <select
                  id="party"
                  name="party"
                  value={formData.party}
                  onChange={handleChange}
                  className={errors.party ? 'error' : ''}
                >
                  <option value="">Select Party</option>
                  {parties.map(party => (
                    <option key={party} value={party}>{party}</option>
                  ))}
                </select>
                {errors.party && <span className="error-text">{errors.party}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="fabricName">Fabric Name <span className="required">*</span></label>
                <select
                  id="fabricName"
                  name="fabricName"
                  value={formData.fabricName}
                  onChange={handleChange}
                  className={errors.fabricName ? 'error' : ''}
                >
                  <option value="">Select Fabric</option>
                  {fabrics.map(fabric => (
                    <option key={fabric} value={fabric}>{fabric}</option>
                  ))}
                </select>
                {errors.fabricName && <span className="error-text">{errors.fabricName}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="lotNo">Lot No. <span className="required">*</span></label>
                <input
                  type="text"
                  id="lotNo"
                  name="lotNo"
                  value={formData.lotNo}
                  onChange={handleChange}
                  className={errors.lotNo ? 'error' : ''}
                />
                {errors.lotNo && <span className="error-text">{errors.lotNo}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="registerNo">Register No. <span className="required">*</span></label>
                <input
                  type="text"
                  id="registerNo"
                  name="registerNo"
                  value={formData.registerNo}
                  onChange={handleChange}
                  className={errors.registerNo ? 'error' : ''}
                />
                {errors.registerNo && <span className="error-text">{errors.registerNo}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="shade">Shade <span className="required">*</span></label>
                <input
                  type="text"
                  id="shade"
                  name="shade"
                  value={formData.shade}
                  onChange={handleChange}
                  className={errors.shade ? 'error' : ''}
                />
                {errors.shade && <span className="error-text">{errors.shade}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="etd">ETD <span className="required">*</span></label>
                <input
                  type="date"
                  id="etd"
                  name="etd"
                  value={formData.etd}
                  onChange={handleChange}
                  className={errors.etd ? 'error' : ''}
                />
                {errors.etd && <span className="error-text">{errors.etd}</span>}
              </div>
            </div>
          </div>

          <div className={`form-section ${activeSection === 'all' || activeSection === 'colors' ? 'visible' : ''}`}>
            <h3 className="section-title">Colors and Percentages</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="color1">Color 1 <span className="required">*</span></label>
                <input
                  type="text"
                  id="color1"
                  name="color1"
                  value={formData.color1}
                  onChange={handleChange}
                  className={errors.color1 ? 'error' : ''}
                />
                {errors.color1 && <span className="error-text">{errors.color1}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="percentage1">Percentage 1 <span className="required">*</span></label>
                <input
                  type="text"
                  id="percentage1"
                  name="percentage1"
                  value={formData.percentage1}
                  onChange={handleChange}
                  placeholder="0.00000"
                  className={errors.percentage1 ? 'error' : ''}
                />
                {errors.percentage1 && <span className="error-text">{errors.percentage1}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="color2">Color 2 <span className="required">*</span></label>
                <input
                  type="text"
                  id="color2"
                  name="color2"
                  value={formData.color2}
                  onChange={handleChange}
                  className={errors.color2 ? 'error' : ''}
                />
                {errors.color2 && <span className="error-text">{errors.color2}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="percentage2">Percentage 2 <span className="required">*</span></label>
                <input
                  type="text"
                  id="percentage2"
                  name="percentage2"
                  value={formData.percentage2}
                  onChange={handleChange}
                  placeholder="0.00000"
                  className={errors.percentage2 ? 'error' : ''}
                />
                {errors.percentage2 && <span className="error-text">{errors.percentage2}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="color3">Color 3 <span className="required">*</span></label>
                <input
                  type="text"
                  id="color3"
                  name="color3"
                  value={formData.color3}
                  onChange={handleChange}
                  className={errors.color3 ? 'error' : ''}
                />
                {errors.color3 && <span className="error-text">{errors.color3}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="percentage3">Percentage 3 <span className="required">*</span></label>
                <input
                  type="text"
                  id="percentage3"
                  name="percentage3"
                  value={formData.percentage3}
                  onChange={handleChange}
                  placeholder="0.00000"
                  className={errors.percentage3 ? 'error' : ''}
                />
                {errors.percentage3 && <span className="error-text">{errors.percentage3}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="color4">Color 4 <span className="required">*</span></label>
                <input
                  type="text"
                  id="color4"
                  name="color4"
                  value={formData.color4}
                  onChange={handleChange}
                  className={errors.color4 ? 'error' : ''}
                />
                {errors.color4 && <span className="error-text">{errors.color4}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="percentage4">Percentage 4 <span className="required">*</span></label>
                <input
                  type="text"
                  id="percentage4"
                  name="percentage4"
                  value={formData.percentage4}
                  onChange={handleChange}
                  placeholder="0.00000"
                  className={errors.percentage4 ? 'error' : ''}
                />
                {errors.percentage4 && <span className="error-text">{errors.percentage4}</span>}
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="remarks">Remarks <span className="required">*</span></label>
              <textarea
                id="remarks"
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                rows="4"
                className={errors.remarks ? 'error' : ''}
              ></textarea>
              {errors.remarks && <span className="error-text">{errors.remarks}</span>}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button">Cancel</button>
            <button type="submit" className={`save-button ${isSaving ? 'loading' : ''}`} disabled={isSaving}>
              {isSaving ? <span className="spinner"></span> : 'Save Recipe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LabRecipeForm
