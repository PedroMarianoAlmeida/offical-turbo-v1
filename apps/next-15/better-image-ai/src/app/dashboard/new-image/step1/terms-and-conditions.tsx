import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/shadcn/dialog";

export const TermsAndConditions = (): React.ReactNode => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="underline">terms and conditions</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Terms and conditions</DialogTitle>
          <DialogDescription>
            <ul className="list-disc text-left flex flex-col gap-3">
              <li>
                Any text, prompt, image, or other content that you submit
                through the Services will be collected by us.
              </li>
              <li>
                We will make text, prompt, image publicly available. This means
                that anyone may access, view, share the content - It is on the
                Home page (the image feed)
              </li>
              <li>
                We will not share any means to the public identity who created
                or submitted such content.
              </li>
            </ul>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
