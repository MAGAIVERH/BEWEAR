const Footer = () => {
  return (
    <div className="bg-accent w-full gap-1 p-4">
      <div className="text-center">
        <p className="text-muted-foreground text-xs">
          © 2025 BEWEAR. Todos os direitos reservados.
        </p>
        <p className="text-muted-foreground text-xs">
          Desenvolvido por{" "}
          <a
            href="https://my-portifolio-three-navy.vercel.app/#s-home"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Magaiver Magalhães
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
