export default function PetIcon({ photo, status, name, circle = true, small }) {
  const photoTransformation =
    typeof photo === 'string' ? photo.replace('/upload/', '/upload/t_media_lib_thumb/') : photo;

  const size = !small ? 'h-16 w-16' : 'h-8 w-8';

  return (
    <div className={`relative ${size} m-2`}>
      <div className={`${circle ? 'rounded-full' : 'rounded'} overflow-hidden ${size}`}>
        <img src={photoTransformation} alt={name} className="object-cover h-full" />
      </div>
      {!small && (
        <div
          className={`absolute bottom-1 right-1 w-3 h-3 rounded-full ${
            status !== 'Adopted' && `bg-${status.toLowerCase()} shadow-inner`
          }`}
        />
      )}
    </div>
  );
}
