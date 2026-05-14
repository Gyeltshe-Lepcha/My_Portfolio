"use client";

export default function AmbientMotion() {
  return (
    <div className="cinematic-ambient" aria-hidden="true">
      <div className="cinematic-ambient__color cinematic-ambient__color--dawn" />
      <div className="cinematic-ambient__color cinematic-ambient__color--night" />
      <div className="cinematic-ambient__glow cinematic-ambient__glow--one" />
      <div className="cinematic-ambient__glow cinematic-ambient__glow--two" />
      <div className="cinematic-ambient__glow cinematic-ambient__glow--three" />
      <div className="cinematic-ambient__fog cinematic-ambient__fog--one" />
      <div className="cinematic-ambient__fog cinematic-ambient__fog--two" />
      <div className="cinematic-ambient__particles" />
      <div className="cinematic-ambient__grain" />
    </div>
  );
}
