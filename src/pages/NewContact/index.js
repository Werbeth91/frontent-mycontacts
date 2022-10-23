import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import ContactsService from '../../services/ContactsService'
import toast from '../../utils/toast';

function NewContact() {
  const handleSubmitNewContact = async (formData) => {

    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      }

      await ContactsService.createContact(contact)

      toast({
        type: 'success',
        text: 'Contato cadastrado com sucesso!',
      })

    } catch (error) {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar contato!'
      })
    }

  }

  return (
    <>
      <PageHeader
        title='Novo contato'
      />
      <ContactForm
        onSubmit={handleSubmitNewContact}
        buttonLabel='Cadastrar'
      />
    </>
  )
}


export default NewContact;
