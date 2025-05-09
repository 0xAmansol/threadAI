import { Badge } from "@workspace/ui/components/badge";
import { Card, CardContent, CardHeader } from "@workspace/ui/components/card";
import { SquarePenIcon } from "@workspace/ui/components/square-pen";
import { LayoutPanelTopIcon } from "@workspace/ui/components/layout-panel-top";
import { cn } from "@workspace/ui/lib/utils";
import { Calendar, LucideIcon, MapIcon, Zap } from "lucide-react";
import { CalendarDaysIcon } from "@workspace/ui/components/calendar-days";
import { ReactElement, ReactNode } from "react";
import * as motion from "motion/react-client";

export function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const badgeVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const zapIconVariants = {
    initial: { rotate: -10, scale: 0.8 },
    animate: {
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.5,
      },
    },
    hover: {
      rotate: 10,
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <motion.section
      className="bg-zinc-50 md:py-32 dark:bg-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="mx-auto max-w-2xl px-6 lg:max-w-5xl">
        <motion.div
          className="mb-10 flex justify-center"
          variants={badgeVariants}
          initial="hidden"
          animate="animate"
          whileHover="hover"
        >
          <Badge className="gap-1 text-xl px-3 py-1 h-14 w-xs bg-neutral-800 text-white border-r rounded-4xl border-gray-900">
            <motion.div variants={zapIconVariants}>
              <Zap
                className="-ms-0.5 opacity-60 text-yellow-500"
                size={32}
                strokeWidth={2}
                aria-hidden="true"
              />
            </motion.div>
            Features
          </Badge>
        </motion.div>

        <motion.div
          className="mx-auto grid gap-4 lg:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <FeatureCard className="hover:bg-gradient-to-t from-yellow-500 to-transparent h-full flex flex-col">
              <CardHeader className="pb-3">
                <CardHeading
                  icon={SquarePenIcon}
                  title="Generate Killer Threads from Youtube Videos"
                  description="Paste a link and get high-quality tweet/thread. Instantly."
                />
              </CardHeader>

              <div className="relative mb-6 border-t border-dashed sm:mb-0">
                <div className="absolute inset-0 [background:radial-gradient(125%_125%_at_50%_0%,transparent_40%,hsl(var(--muted)),white_125%)]"></div>
                <motion.div
                  className="aspect-[76/59] p-1 px-6 mt-8"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <DualModeImage
                    className="border border-r rounded-md"
                    darkSrc="/features-dark.png"
                    lightSrc="/features-light2.png"
                    alt="payments illustration"
                    width={1207}
                    height={929}
                  />
                </motion.div>
              </div>
            </FeatureCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <FeatureCard className="hover:bg-gradient-to-t from-yellow-500 to-transparent h-full flex flex-col">
              <CardHeader className="pb-12">
                <CardHeading
                  icon={CalendarDaysIcon}
                  title="Auto-Scheduling (Coming Soon)"
                  description="Paste a link, and our AI gives you a high-quality Twitter thread in your voice."
                />
              </CardHeader>

              <CardContent>
                <div className="relative mb-6 sm:mb-0">
                  <div className="absolute -inset-6 [background:radial-gradient(50%_50%_at_75%_50%,transparent,hsl(var(--background))_100%)]"></div>
                  <motion.div
                    className="aspect-[76/59] border"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <DualModeImage
                      darkSrc="https://tailark.com/_next/image?url=%2Forigin-cal-dark.png&w=3840&q=75"
                      lightSrc="https://tailark.com/_next/image?url=%2Forigin-cal.png&w=3840&q=75"
                      alt="calendar illustration"
                      width={1207}
                      height={800}
                    />
                  </motion.div>
                </div>
              </CardContent>
            </FeatureCard>
          </motion.div>

          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <FeatureCard className="flex p-6 hover:bg-gradient-to-t from-yellow-500 to-transparent h-fit">
              <motion.div
                className="flex items-center justify-center gap-2 w-full"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.div
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut",
                  }}
                >
                  <LayoutPanelTopIcon className="size-sm text-yellow-500" />
                </motion.div>
                <span className="clip-text bg-gradient-to-r from-yellow-600 to-yellow-300 bg-clip-text font-[800] text-transparent transition-all duration-200 text-lg">
                  Steal like a creator, remix great content
                </span>
              </motion.div>

              <motion.div
                className="flex justify-center gap-6 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <CircularUI
                  label="Explore"
                  circles={[{ pattern: "border" }, { pattern: "border" }]}
                />

                <CircularUI
                  label="Featured"
                  circles={[{ pattern: "none" }, { pattern: "primary" }]}
                />

                <CircularUI
                  label="Top picks"
                  circles={[{ pattern: "yellow" }, { pattern: "none" }]}
                />

                <CircularUI
                  label="For you"
                  circles={[{ pattern: "primary" }, { pattern: "none" }]}
                  className="hidden sm:block"
                />
              </motion.div>

              <div className="relative mb-2 border-t border-dashed sm:mb-0">
                <div className="absolute inset-0 [background:radial-gradient(125%_125%_at_50%_0%,transparent_40%,hsl(var(--muted)),white_125%)] w-2xl"></div>
                <motion.div
                  className="aspect-[76/59] p-1 px-6 mt-8"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <DualModeImage
                    className="border border-r rounded-md"
                    darkSrc="/Discover.png"
                    lightSrc="/Discover.png"
                    alt="payments illustration"
                    width={1207}
                    height={929}
                  />
                </motion.div>
              </div>
            </FeatureCard>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

interface FeatureCardProps {
  children: ReactNode;
  className?: string;
}

const FeatureCard = ({ children, className }: FeatureCardProps) => (
  <motion.div
    whileHover={{
      y: -5,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
    }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <Card
      className={cn("group relative rounded-none shadow-amber-50", className)}
    >
      <CardDecorator />
      {children}
    </Card>
  </motion.div>
);

const CardDecorator = () => (
  <>
    <motion.span
      className="border-primary absolute -left-px -top-px block size-2 border-l-2 border-t-2"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    />
    <motion.span
      className="border-primary absolute -right-px -top-px block size-2 border-r-2 border-t-2"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    />
    <motion.span
      className="border-primary absolute -bottom-px -left-px block size-2 border-b-2 border-l-2"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.4 }}
    />
    <motion.span
      className="border-primary absolute -bottom-px -right-px block size-2 border-b-2 border-r-2"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.5 }}
    />
  </>
);

interface CardHeadingProps {
  icon: any;
  title: string;
  description: string;
}

const CardHeading = ({ icon: Icon, title, description }: CardHeadingProps) => (
  <div className="p-3">
    <div className="flex items-center gap-2 justify-between">
      <motion.div
        whileHover={{ rotate: 10, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        <Icon className="size-5 text-yellow-500 mr-3 justify-center items-center" />
      </motion.div>
      <motion.span
        className="clip-text bg-gradient-to-r from-yellow-600 to-yellow-300 bg-clip-text font-[800] text-transparent transition-all duration-200 w-full mt-2 justify-center items-center"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {title}
      </motion.span>
    </div>
    <motion.p
      className="mt-8 text-2xl font-semibold"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {description}
    </motion.p>
  </div>
);

interface DualModeImageProps {
  darkSrc: string;
  lightSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

const DualModeImage = ({
  darkSrc,
  lightSrc,
  alt,
  width,
  height,
  className,
}: DualModeImageProps) => (
  <>
    <motion.img
      src={darkSrc}
      className={cn("hidden dark:block", className)}
      alt={`${alt} dark`}
      width={width}
      height={height}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
    <motion.img
      src={lightSrc}
      className={cn("shadow dark:hidden", className)}
      alt={`${alt} light`}
      width={width}
      height={height}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
  </>
);

interface CircleConfig {
  pattern: "none" | "border" | "primary" | "blue" | "yellow";
}

interface CircularUIProps {
  label: string;
  circles: CircleConfig[];
  className?: string;
}

const CircularUI = ({ label, circles, className }: CircularUIProps) => (
  <motion.div
    className={className}
    whileHover={{ y: -5 }}
    transition={{ type: "spring", stiffness: 400, damping: 15 }}
  >
    <div className="bg-gradient-to-b from-border size-fit rounded-2xl to-transparent p-px">
      <motion.div
        className="bg-gradient-to-b from-background to-muted/25 relative flex aspect-square w-fit items-center -space-x-4 rounded-[15px] p-4"
        whileHover={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 0.5 }}
      >
        {circles.map((circle, i) => (
          <motion.div
            key={i}
            className={cn("size-7 rounded-full border sm:size-8", {
              "border-primary": circle.pattern === "none",
              "border-primary bg-[repeating-linear-gradient(-45deg,hsl(var(--border)),hsl(var(--border))_1px,transparent_1px,transparent_4px)]":
                circle.pattern === "border",
              "border-primary bg-background bg-[repeating-linear-gradient(-45deg,hsl(var(--primary)),hsl(var(--primary))_1px,transparent_1px,transparent_4px)]":
                circle.pattern === "primary",
              "bg-background z-1 border-yellow-500 bg-[repeating-linear-gradient(-45deg,theme(colors.yellow.500),theme(colors.yellow.500)_1px,transparent_1px,transparent_4px)]":
                circle.pattern === "yellow",
            })}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 * i, duration: 0.4 }}
          ></motion.div>
        ))}
      </motion.div>
    </div>
    <motion.span
      className="text-muted-foreground mt-1.5 block text-center text-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.3 }}
    >
      {label}
    </motion.span>
  </motion.div>
);
