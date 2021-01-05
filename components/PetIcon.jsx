export default function PetIcon({ photo, status, name }) {
  const photoTransformation =
    typeof photo === 'string'
      ? photo.replace('/upload/', '/upload/t_media_lib_thumb/')
      : photo;

  return (
    <div className="relative h-16 w-16 m-2">
      <div className="rounded-full overflow-hidden h-16 w-16">
        <img
          src={photoTransformation}
          alt={name}
          className="object-cover h-full"
        />
      </div>
      <div
        className={`absolute bottom-1 right-1 w-3 h-3 rounded-full ${
          status !== 'Adopted' && `bg-${status.toLowerCase()} shadow-inner`
        }`}
      />
    </div>
  );
}
