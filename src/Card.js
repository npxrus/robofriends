const Card = ({ id, firstname, lastname, email }) => {
  return (
    <div className='bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5 tc'>
      <img
        src={`https://robohash.org/${id}?200x200`}
        alt={`Фото ${firstname} ${lastname}`}
      />
      <div>
        <h2>{`${firstname} ${lastname}`}</h2>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default Card;
