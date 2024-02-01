import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Performance from "./performance";
import Battery from "./battery";
import Warranty from "./warranty";
import Dimension from "./dimension";
import Summary from "./summary";

const Spec = ({
  primaryCarId,
  secondaryCarId,
}: {
  primaryCarId: string;
  secondaryCarId: string;
}) => {
  return (
    <Accordion type="single" collapsible defaultValue="summary">
      <AccordionItem value="summary">
        <AccordionTrigger>요약</AccordionTrigger>
        <AccordionContent className="py-4 pb-8">
          <Summary primaryId={primaryCarId} secondaryId={secondaryCarId} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="performance">
        <AccordionTrigger>주행 성능</AccordionTrigger>
        <AccordionContent className="py-4">
          <Performance primaryId={primaryCarId} secondaryId={secondaryCarId} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="charging">
        <AccordionTrigger>충전</AccordionTrigger>
        <AccordionContent className="py-4">
          <Battery primaryId={primaryCarId} secondaryId={secondaryCarId} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="dimension">
        <AccordionTrigger>차량 크기</AccordionTrigger>
        <AccordionContent className="py-4">
          <Dimension primaryId={primaryCarId} secondaryId={secondaryCarId} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="warranty">
        <AccordionTrigger>차량 보증</AccordionTrigger>
        <AccordionContent className="py-4">
          <Warranty primaryId={primaryCarId} secondaryId={secondaryCarId} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Spec;
