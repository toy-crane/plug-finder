interface Props {
  title: string;
  content: string;
}
const Label = ({ title, content }: Props) => {
  return (
    <div className="flex items-center">
      <h3 className="mr-4 shrink-0 text-lg font-semibold">{title}</h3>
      <div className="text-muted-foreground text-lg">{content}</div>
    </div>
  );
};

export default Label;
