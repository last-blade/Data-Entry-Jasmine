import { useState, useRef, useEffect } from 'react'
import toast from 'react-hot-toast'
import { 
  Save, 
  X, 
  ChevronDown, 
  Calendar, 
  Check, 
  AlertCircle,
  HelpCircle,
  Info,
  Droplet,
  Percent,
  FileText,
  Clock
} from 'react-feather'

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
  const [formProgress, setFormProgress] = useState(0)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [activeColorField, setActiveColorField] = useState(null)
  const [selectedColor, setSelectedColor] = useState('#ffffff')
  const [showTooltip, setShowTooltip] = useState(null)
  
  const colorPickerRef = useRef(null)
  const formRef = useRef(null)

  // Sample data for dropdowns
  const parties = [
    { id: 'party-a', name: 'Acme Textiles Inc.' },
    { id: 'party-b', name: 'Fabric Masters Ltd.' },
    { id: 'party-c', name: 'Textile Innovations' },
    { id: 'party-d', name: 'Global Fabrics Co.' },
    { id: 'party-e', name: 'Premium Cloth Works' }
  ]
  
  const fabrics = [
    { id: 'cotton', name: 'Cotton', properties: '100% Natural' },
    { id: 'polyester', name: 'Polyester', properties: 'Synthetic' },
    { id: 'silk', name: 'Silk', properties: 'Natural Protein Fiber' },
    { id: 'wool', name: 'Wool', properties: 'Natural Protein Fiber' },
    { id: 'linen', name: 'Linen', properties: 'Natural Bast Fiber' },
    { id: 'denim', name: 'Denim', properties: 'Cotton Twill Textile' }
  ]
  
  const colorPresets = [
    '#FF5630', '#FF8B00', '#FFC400', '#36B37E', 
    '#00B8D9', '#6554C0', '#8777D9', '#998DD9', 
    '#C0B6F2', '#4C9AFF', '#B3D4FF', '#EBECF0'
  ]

  useEffect(() => {
    // Calculate form progress
    const totalFields = Object.keys(formData).length
    const filledFields = Object.values(formData).filter(value => value !== '').length
    const progress = Math.round((filledFields / totalFields) * 100)
    setFormProgress(progress)
    
    // Close color picker when clicking outside
    const handleClickOutside = (event) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        setShowColorPicker(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [formData])

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
  
  const handleColorSelect = (color) => {
    if (activeColorField) {
      setFormData({
        ...formData,
        [activeColorField]: color
      })
      setSelectedColor(color)
      
      // Clear error for this field if it exists
      if (errors[activeColorField]) {
        setErrors({
          ...errors,
          [activeColorField]: ''
        })
      }
    }
  }
  
  const openColorPicker = (fieldName) => {
    setActiveColorField(fieldName)
    setSelectedColor(formData[fieldName] || '#ffffff')
    setShowColorPicker(true)
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Check all fields are filled
    Object.keys(formData).forEach(key => {
      if (!formData[key]) {
        newErrors[key] = 'This field is required'
      }
    })
    
    // Additional validation for percentage fields
    const percentageFields = ['percentage1', 'percentage2', 'percentage3', 'percentage4']
    let totalPercentage = 0
    
    percentageFields.forEach(field => {
      if (formData[field]) {
        totalPercentage += parseFloat(formData[field])
      }
    })
    
    // if (totalPercentage !== 100 && totalPercentage !== 0) {
    //   percentageFields.forEach(field => {
    //     newErrors[field] = newErrors[field] || 'Percentages must sum to 100%'
    //   })
    // }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Simulate saving with progress
      setIsSaving(true)
      
      // Simulate API call with progress
      const timer = setTimeout(() => {
        // In a real app, you would send this data to an API
        console.log('Form data submitted:', formData)
        
        // Show success toast
        toast.success(
          <div className="toast-message">
            <div className="toast-title">
              <Check size={18} />
              Recipe Saved Successfully
            </div>
            <p>Your lab recipe has been saved to the database.</p>
          </div>
        )
        
        // Reset form
        setFormData(initialFormState)
        setIsSaving(false)
        
        // Scroll to top of form
        if (formRef.current) {
          formRef.current.scrollIntoView({ behavior: 'smooth' })
        }
      }, 2000)
      
      return () => clearTimeout(timer)
    } else {
      toast.error(
        <div className="toast-message">
          <div className="toast-title">
            <AlertCircle size={18} />
            Validation Error
          </div>
          <p>Please fill all required fields correctly.</p>
        </div>
      )
      
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0]
      if (firstErrorField) {
        const errorElement = document.querySelector(`[name="${firstErrorField}"]`)
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
          errorElement.focus()
        }
      }
    }
  }

  const setSection = (section) => {
    setActiveSection(section)
  }
  
  const handleCancel = () => {
    // Show confirmation if form has been modified
    const isFormModified = Object.values(formData).some(value => value !== '')
    
    if (isFormModified) {
      if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
        setFormData(initialFormState)
        setErrors({})
      }
    } else {
      setFormData(initialFormState)
      setErrors({})
    }
  }
  
  const showFieldTooltip = (fieldName) => {
    setShowTooltip(fieldName)
  }
  
  const hideFieldTooltip = () => {
    setShowTooltip(null)
  }

  return (
    <div className="lab-recipe-form-container" data-aos="fade-up" ref={formRef}>
      <div className="form-header">
        <div className="form-title">
          <h2>Create New Lab Recipe</h2>
          <p>Fill in the details to create a new lab recipe</p>
        </div>
        
        <div className="form-progress">
          <div className="progress-text">
            <span>Completion</span>
            <span>{formProgress}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${formProgress}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="form-tabs">
        <button 
          className={`tab-button ${activeSection === 'all' ? 'active' : ''}`} 
          onClick={() => setSection('all')}
        >
          <span className="tab-icon all-icon"></span>
          All Fields
        </button>
        <button 
          className={`tab-button ${activeSection === 'basic' ? 'active' : ''}`} 
          onClick={() => setSection('basic')}
        >
          <span className="tab-icon basic-icon"></span>
          Basic Info
        </button>
        <button 
          className={`tab-button ${activeSection === 'colors' ? 'active' : ''}`} 
          onClick={() => setSection('colors')}
        >
          <span className="tab-icon colors-icon"></span>
          Colors
        </button>
      </div>
      
      <div className="lab-recipe-form">
        <form onSubmit={handleSubmit}>
          <div className={`form-section ${activeSection === 'all' || activeSection === 'basic' ? 'visible' : ''}`}>
            <div className="section-header">
              <FileText size={18} />
              <h3 className="section-title">Basic Information</h3>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="party">
                  Party <span className="required">*</span>
                  <HelpCircle 
                    size={14} 
                    className="help-icon"
                    onMouseEnter={() => showFieldTooltip('party')}
                    onMouseLeave={hideFieldTooltip}
                  />
                  {showTooltip === 'party' && (
                    <div className="field-tooltip">
                      Select the client or organization for this recipe
                    </div>
                  )}
                </label>
                <div className="custom-select">
                  <select
                    id="party"
                    name="party"
                    value={formData.party}
                    onChange={handleChange}
                    className={errors.party ? 'error' : ''}
                  >
                    <option value="">Select Party</option>
                    {parties.map(party => (
                      <option key={party.id} value={party.id}>{party.name}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="select-icon" />
                </div>
                {errors.party && (
                  <span className="error-text">
                    <AlertCircle size={14} />
                    {errors.party}
                  </span>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="fabricName">
                  Fabric Name <span className="required">*</span>
                  <HelpCircle 
                    size={14} 
                    className="help-icon"
                    onMouseEnter={() => showFieldTooltip('fabric')}
                    onMouseLeave={hideFieldTooltip}
                  />
                  {showTooltip === 'fabric' && (
                    <div className="field-tooltip">
                      Select the type of fabric for this recipe
                    </div>
                  )}
                </label>
                <div className="custom-select">
                  <select
                    id="fabricName"
                    name="fabricName"
                    value={formData.fabricName}
                    onChange={handleChange}
                    className={errors.fabricName ? 'error' : ''}
                  >
                    <option value="">Select Fabric</option>
                    {fabrics.map(fabric => (
                      <option key={fabric.id} value={fabric.id}>
                        {fabric.name} - {fabric.properties}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="select-icon" />
                </div>
                {errors.fabricName && (
                  <span className="error-text">
                    <AlertCircle size={14} />
                    {errors.fabricName}
                  </span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="lotNo">
                  Lot No. <span className="required">*</span>
                </label>
                <div className="input-with-icon">
                  <input
                    type="text"
                    id="lotNo"
                    name="lotNo"
                    value={formData.lotNo}
                    onChange={handleChange}
                    className={errors.lotNo ? 'error' : ''}
                    placeholder="Enter lot number"
                  />
                  <Info size={16} className="input-icon" />
                </div>
                {errors.lotNo && (
                  <span className="error-text">
                    <AlertCircle size={14} />
                    {errors.lotNo}
                  </span>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="registerNo">
                  Register No. <span className="required">*</span>
                </label>
                <div className="input-with-icon">
                  <input
                    type="text"
                    id="registerNo"
                    name="registerNo"
                    value={formData.registerNo}
                    onChange={handleChange}
                    className={errors.registerNo ? 'error' : ''}
                    placeholder="Enter register number"
                  />
                  <Info size={16} className="input-icon" />
                </div>
                {errors.registerNo && (
                  <span className="error-text">
                    <AlertCircle size={14} />
                    {errors.registerNo}
                  </span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="shade">
                  Shade <span className="required">*</span>
                </label>
                <div className="input-with-icon">
                  <input
                    type="text"
                    id="shade"
                    name="shade"
                    value={formData.shade}
                    onChange={handleChange}
                    className={errors.shade ? 'error' : ''}
                    placeholder="Enter shade"
                  />
                  <Droplet size={16} className="input-icon" />
                </div>
                {errors.shade && (
                  <span className="error-text">
                    <AlertCircle size={14} />
                    {errors.shade}
                  </span>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="etd">
                  ETD <span className="required">*</span>
                  <HelpCircle 
                    size={14} 
                    className="help-icon"
                    onMouseEnter={() => showFieldTooltip('etd')}
                    onMouseLeave={hideFieldTooltip}
                  />
                  {showTooltip === 'etd' && (
                    <div className="field-tooltip">
                      Estimated Time of Delivery
                    </div>
                  )}
                </label>
                <div className="input-with-icon date-input">
                  <input
                    type="date"
                    id="etd"
                    name="etd"
                    value={formData.etd}
                    onChange={handleChange}
                    className={errors.etd ? 'error' : ''}
                  />
                  <Calendar size={16} className="input-icon" />
                </div>
                {errors.etd && (
                  <span className="error-text">
                    <AlertCircle size={14} />
                    {errors.etd}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className={`form-section ${activeSection === 'all' || activeSection === 'colors' ? 'visible' : ''}`}>
            <div className="section-header">
              <Droplet size={18} />
              <h3 className="section-title">Colors and Percentages</h3>
            </div>
            
            <div className="color-grid">
              <div className="color-item">
                <div className="form-group">
                  <label htmlFor="color1">
                    Color 1 <span className="required">*</span>
                  </label>
                  <div className="color-input-group">
                    <input
                      type="text"
                      id="color1"
                      name="color1"
                      value={formData.color1}
                      onChange={handleChange}
                      className={errors.color1 ? 'error' : ''}
                      placeholder="Enter color name"
                    />
                    <button 
                      type="button" 
                      className="color-picker-button"
                      onClick={() => openColorPicker('color1')}
                      style={{ backgroundColor: formData.color1 || '#ffffff' }}
                    ></button>
                  </div>
                  {errors.color1 && (
                    <span className="error-text">
                      <AlertCircle size={14} />
                      {errors.color1}
                    </span>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="percentage1">
                    Percentage 1 <span className="required">*</span>
                  </label>
                  <div className="input-with-icon">
                    <input
                      type="text"
                      id="percentage1"
                      name="percentage1"
                      value={formData.percentage1}
                      onChange={handleChange}
                      placeholder="0.00000"
                      className={errors.percentage1 ? 'error' : ''}
                    />
                    <Percent size={16} className="input-icon" />
                  </div>
                  {errors.percentage1 && (
                    <span className="error-text">
                      <AlertCircle size={14} />
                      {errors.percentage1}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="color-item">
                <div className="form-group">
                  <label htmlFor="color2">
                    Color 2 <span className="required">*</span>
                  </label>
                  <div className="color-input-group">
                    <input
                      type="text"
                      id="color2"
                      name="color2"
                      value={formData.color2}
                      onChange={handleChange}
                      className={errors.color2 ? 'error' : ''}
                      placeholder="Enter color name"
                    />
                    <button 
                      type="button" 
                      className="color-picker-button"
                      onClick={() => openColorPicker('color2')}
                      style={{ backgroundColor: formData.color2 || '#ffffff' }}
                    ></button>
                  </div>
                  {errors.color2 && (
                    <span className="error-text">
                      <AlertCircle size={14} />
                      {errors.color2}
                    </span>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="percentage2">
                    Percentage 2 <span className="required">*</span>
                  </label>
                  <div className="input-with-icon">
                    <input
                      type="text"
                      id="percentage2"
                      name="percentage2"
                      value={formData.percentage2}
                      onChange={handleChange}
                      placeholder="0.00000"
                      className={errors.percentage2 ? 'error' : ''}
                    />
                    <Percent size={16} className="input-icon" />
                  </div>
                  {errors.percentage2 && (
                    <span className="error-text">
                      <AlertCircle size={14} />
                      {errors.percentage2}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="color-item">
                <div className="form-group">
                  <label htmlFor="color3">
                    Color 3 <span className="required">*</span>
                  </label>
                  <div className="color-input-group">
                    <input
                      type="text"
                      id="color3"
                      name="color3"
                      value={formData.color3}
                      onChange={handleChange}
                      className={errors.color3 ? 'error' : ''}
                      placeholder="Enter color name"
                    />
                    <button 
                      type="button" 
                      className="color-picker-button"
                      onClick={() => openColorPicker('color3')}
                      style={{ backgroundColor: formData.color3 || '#ffffff' }}
                    ></button>
                  </div>
                  {errors.color3 && (
                    <span className="error-text">
                      <AlertCircle size={14} />
                      {errors.color3}
                    </span>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="percentage3">
                    Percentage 3 <span className="required">*</span>
                  </label>
                  <div className="input-with-icon">
                    <input
                      type="text"
                      id="percentage3"
                      name="percentage3"
                      value={formData.percentage3}
                      onChange={handleChange}
                      placeholder="0.00000"
                      className={errors.percentage3 ? 'error' : ''}
                    />
                    <Percent size={16} className="input-icon" />
                  </div>
                  {errors.percentage3 && (
                    <span className="error-text">
                      <AlertCircle size={14} />
                      {errors.percentage3}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="color-item">
                <div className="form-group">
                  <label htmlFor="color4">
                    Color 4 <span className="required">*</span>
                  </label>
                  <div className="color-input-group">
                    <input
                      type="text"
                      id="color4"
                      name="color4"
                      value={formData.color4}
                      onChange={handleChange}
                      className={errors.color4 ? 'error' : ''}
                      placeholder="Enter color name"
                    />
                    <button 
                      type="button" 
                      className="color-picker-button"
                      onClick={() => openColorPicker('color4')}
                      style={{ backgroundColor: formData.color4 || '#ffffff' }}
                    ></button>
                  </div>
                  {errors.color4 && (
                    <span className="error-text">
                      <AlertCircle size={14} />
                      {errors.color4}
                    </span>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="percentage4">
                    Percentage 4 <span className="required">*</span>
                  </label>
                  <div className="input-with-icon">
                    <input
                      type="text"
                      id="percentage4"
                      name="percentage4"
                      value={formData.percentage4}
                      onChange={handleChange}
                      placeholder="0.00000"
                      className={errors.percentage4 ? 'error' : ''}
                    />
                    <Percent size={16} className="input-icon" />
                  </div>
                  {errors.percentage4 && (
                    <span className="error-text">
                      <AlertCircle size={14} />
                      {errors.percentage4}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="remarks">
                Remarks <span className="required">*</span>
                <HelpCircle 
                  size={14} 
                  className="help-icon"
                  onMouseEnter={() => showFieldTooltip('remarks')}
                  onMouseLeave={hideFieldTooltip}
                />
                {showTooltip === 'remarks' && (
                  <div className="field-tooltip">
                    Add any additional notes or special instructions
                  </div>
                )}
              </label>
              <textarea
                id="remarks"
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                rows="4"
                // cols= "10"
                className={`w-full ${errors.remarks ? 'error' : ''}`}
                placeholder="Enter any additional notes or special instructions..."
              ></textarea>
              {errors.remarks && (
                <span className="error-text">
                  <AlertCircle size={14} />
                  {errors.remarks}
                </span>
              )}
            </div>
          </div>

          {showColorPicker && (
            <div className="color-picker-container" ref={colorPickerRef}>
              <div className="color-picker-header">
                <h4>Select Color</h4>
                <button 
                  type="button" 
                  className="close-picker"
                  onClick={() => setShowColorPicker(false)}
                >
                  <X size={16} />
                </button>
              </div>
              <div className="color-picker-body">
                <div className="color-preview" style={{ backgroundColor: selectedColor }}>
                  <span>{selectedColor}</span>
                </div>
                <div className="color-presets">
                  {colorPresets.map((color, index) => (
                    <button
                      key={index}
                      type="button"
                      className="color-preset-button"
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorSelect(color)}
                    ></button>
                  ))}
                </div>
                <div className="color-input-container">
                  <label>Custom Color</label>
                  <input
                    type="color"
                    value={selectedColor}
                    onChange={(e) => handleColorSelect(e.target.value)}
                  />
                </div>
              </div>
              <div className="color-picker-footer">
                <button 
                  type="button" 
                  className="apply-color-button"
                  onClick={() => setShowColorPicker(false)}
                >
                  Apply Color
                </button>
              </div>
            </div>
          )}

          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-button"
              onClick={handleCancel}
            >
              <X size={18} />
              <span>Cancel</span>
            </button>
            
            <button 
              type="submit" 
              className={`save-button ${isSaving ? 'loading' : ''}`} 
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <div className="button-loader">
                    <span></span><span></span><span></span>
                  </div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={18} />
                  <span>Save Recipe</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LabRecipeForm
