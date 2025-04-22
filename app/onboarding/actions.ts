'use server'

import { revalidatePath } from 'next/cache'

export async function submitOnboardingForm(formData: FormData) {
  try {
    // Extract form data
    const fullName = formData.get('fullName') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const title = formData.get('title') as string
    const linkedin = formData.get('linkedin') as string
    const instagram = formData.get('instagram') as string
    const facebook = formData.get('facebook') as string
    const twitter = formData.get('twitter') as string
    const successDefinition = formData.get('successDefinition') as string
    const contentGoals = formData.get('contentGoals') as string
    const challenges = formData.get('challenges') as string
    const colorPreference = formData.get('colorPreference') as string
    const stylePackage = formData.get('stylePackage') as string
    
    // Generate project ID
    const now = new Date()
    const nameParts = fullName.toLowerCase().trim().split(' ')
    const firstName = nameParts[0]
    const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : 'unknown'
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hour = String(now.getHours()).padStart(2, '0')
    const minute = String(now.getMinutes()).padStart(2, '0')
    const projectId = `${lastName}-${firstName}-${year}${month}${day}-${hour}${minute}`
    
    // Create CSV content
    const formDataObject = {
      fullName,
      email,
      phone,
      title,
      linkedin,
      instagram,
      facebook,
      twitter,
      successDefinition,
      contentGoals,
      challenges,
      colorPreference,
      stylePackage,
      projectId
    }
    
    // Create CSV header and row
    const headers = Object.keys(formDataObject)
    const csvContent = [
      headers.join(','),
      Object.values(formDataObject).map(value => `"${value || ''}"`).join(',')
    ].join('\n')
    
    // Return success with project ID and CSV content
    return { 
      success: true, 
      projectId, 
      csvContent,
      message: 'Form submitted successfully'
    }
  } catch (error) {
    console.error('Form submission error:', error)
    return { 
      success: false, 
      message: 'There was an error submitting your form. Please try again.'
    }
  }
}
