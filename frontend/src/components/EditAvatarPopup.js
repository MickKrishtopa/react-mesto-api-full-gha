import PopupWithForm from './PopupWithForm';
import { useEffect, useRef } from 'react';

export default function EditAvatarPopup({
  isOpen,
  closeAllPopups,
  onUpdateAvatar,
  isLoading,
}) {
  const newAvatarInput = useRef();
  const errorMessage = useRef();

  function hadleSubmit(e) {
    console.log('Submit', newAvatarInput.current.value);
    e.preventDefault();
    onUpdateAvatar(newAvatarInput.current.value);
  }

  useEffect(() => {
    if (isOpen) {
      console.log('Render ');
      newAvatarInput.current.value = '';
      errorMessage.current.textContent = '';
    }
  }, [isOpen]);

  function handleChangeInput() {
    errorMessage.current.textContent = newAvatarInput.current.validationMessage;
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="profile-image-edit"
      isOpen={isOpen}
      onClose={closeAllPopups}
      onSubmit={hadleSubmit}
      isLoading={isLoading}
    >
      <input
        ref={newAvatarInput}
        placeholder="Ссылка на картинку"
        className="popup__input popup__description"
        type="url"
        name="avatar"
        required
        onChange={handleChangeInput}
      />
      <span
        ref={errorMessage}
        className="popup__input-error-message avatar-input-error"
      ></span>
    </PopupWithForm>
  );
}
