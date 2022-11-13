import Card from './Card';

const CardList = ({ robots }) => {
  return (
    <div>
      {robots.map((robot) => (
        <Card
          key={robot.id}
          id={robot.id}
          firstname={robot.firstname}
          lastname={robot.lastname}
          email={robot.email}
        />
      ))}
    </div>
  );
};

export default CardList;
