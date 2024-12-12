interface CardThemeProps {
  toggleTheme: () => void;
  title: string;
  image: string;
}

const CardTheme: React.FC<CardThemeProps> = ({ toggleTheme, title, image }) => {
  return (
    <button onClick={toggleTheme}>
      <span className="font-bold">{title}</span>
      <img className="rounded-lg" src={image} alt={`Imagem do tema ${title}`} />
    </button>
  );
};

export default CardTheme;
