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
        <AccordionContent>
          <Summary primaryId={primaryCarId} secondaryId={secondaryCarId} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="performance">
        <AccordionTrigger>주행 성능</AccordionTrigger>
        <AccordionContent>
          <Performance primaryId={primaryCarId} secondaryId={secondaryCarId} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="charging">
        <AccordionTrigger>충전</AccordionTrigger>
        <AccordionContent>
          <Battery primaryId={primaryCarId} secondaryId={secondaryCarId} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="dimension">
        <AccordionTrigger>차량 크기</AccordionTrigger>
        <AccordionContent>
          <Dimension primaryId={primaryCarId} secondaryId={secondaryCarId} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="warranty">
        <AccordionTrigger>차량 보증</AccordionTrigger>
        <AccordionContent>
          <Warranty primaryId={primaryCarId} secondaryId={secondaryCarId} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Spec;
