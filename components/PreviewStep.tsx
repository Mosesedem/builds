interface PreviewStepProps {
    formData: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      dob: string;
      maritalStatus: string;
      plan: string;
      duration: string;
    };
    previewImage: string | null;
  }
  
  export function PreviewStep({ formData, previewImage }: PreviewStepProps) {
    return (
      <>
        <h2 className="text-xl font-bold">Preview</h2>
        <p><strong>First Name:</strong> {formData.firstName}</p>
        <p><strong>Last Name:</strong> {formData.lastName}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Phone:</strong> {formData.phone}</p>
        <p><strong>Date of Birth:</strong> {formData.dob}</p>
        <p><strong>Marital Status:</strong> {formData.maritalStatus}</p>
        <p><strong>Selected Plan:</strong> {formData.plan}</p>
        <p><strong>Payment Duration:</strong> {formData.duration}</p>
        {previewImage && (
          <div>
            <p><strong>Headshot:</strong></p>
            <img src={previewImage} alt="Headshot" className="w-32 h-32 object-cover rounded-full border" />
          </div>
        )}
      </>
    );
  }
  
  